import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales: ['en-US', 'ja-JP', 'fr-FR'],
  directory: path.join(__dirname, '../locals')
})

export default (phrase, language, extraMessage = '') => {
  i18n.setLocale(language || 'en-US')
  return i18n.__(phrase) + ' ' + extraMessage
}
