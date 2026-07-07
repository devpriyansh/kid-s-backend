import balanceNamespace from './balance.namespace'
import dfsContestNamespace from './dfsContest.namespace'

export default function (io) {
  balanceNamespace(io)
  dfsContestNamespace(io)
}
