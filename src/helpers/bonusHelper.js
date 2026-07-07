import { Op } from 'sequelize'
import db, { sequelize } from '../db/models'
import { v4 as uuidv4 } from 'uuid'
const { Bonuses, UserBonuses, Transaction } = db

/**
 * Assign a bonus to a user and record a transaction.
 */
export const eazyBucksBonusAssign = async ({
  userId,
  bonusId,
  expiresInDays = 14,
  bonusAmount = 0,
  usedAmount = 0,
  description = '',
  paymentType,
  paymentFor = 'EASY_BUCKS',
  operatorType = 'subscriber'
}) => {
  const t = await sequelize.transaction()

  try {
    const bonus = await Bonuses.findByPk(bonusId, { transaction: t })

    if (!bonus || !bonus.isActive) {
      throw new Error('Bonus not found or inactive')
    }

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)

    const userBonus = await UserBonuses.create(
      {
        userId,
        bonusId,
        bonusAmount,
        usedAmount,
        issuedAt: new Date(),
        expiresAt,
        status: 1,
        description
      },
      { transaction: t }
    )

    await Transaction.create(
      {
        transactionUuid: uuidv4(),
        userId,
        contestId: null,
        amount: bonusAmount,
        nonCashAmount: 0,
        currencyCode: 'USD',
        paymentFor,
        operatorType,
        description,
        isProcessed: 1,
        paymentType, // "CREDIT" or "DEBIT"
        operatorId: 10
      },
      { transaction: t }
    )

    await t.commit()
    return userBonus
  } catch (err) {
    await t.rollback()
    console.error('Failed to assign bonus:', err)
    throw err
  }
}

/**
 * Get valid bonuses for a user
 */
export const getUserActiveBonuses = async (userId) => {
  const now = new Date()
  return await UserBonuses.findAll({
    where: {
      userId,
      status: 1,
      expiresAt: { [Op.gt]: now }
    },
    include: [{ model: Bonuses, as: 'bonus' }]
  })
}

/**
 * Use bonus amount (partial or full)
 */
export const useUserBonus = async (userBonusId, amount) => {
  const userBonus = await UserBonuses.findByPk(userBonusId)
  if (!userBonus || userBonus.status !== 1) {
    throw new Error('Invalid or inactive bonus')
  }

  if (userBonus.bonusAmount - userBonus.usedAmount < amount) {
    throw new Error('Insufficient bonus balance')
  }

  userBonus.usedAmount += amount

  if (userBonus.usedAmount >= userBonus.bonusAmount) {
    userBonus.status = 2 // fully used
  }

  await userBonus.save()
  return userBonus
}

/**
 * Expire all bonuses past their expiration date
 */
export const expireBonuses = async () => {
  const now = new Date()
  await UserBonuses.update(
    { status: 3 },
    {
      where: {
        expiresAt: { [Op.lt]: now },
        status: 1
      }
    }
  )
}
