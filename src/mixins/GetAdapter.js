import ConnectionService from '@/services/elasticsearch/ConnectionService'
import store from '@/store'

export default async function esAdapter () {
  if (store.state.connection.elasticsearchAdapter !== null) {
    return store.state.connection.elasticsearchAdapter
  } else {
    let connectionService = new ConnectionService(store.state.connection.elasticsearchHost)
    let adapter = await connectionService.getAdapter()
    store.commit('connection/setElasticsearchAdapter', adapter)
    store.commit('connection/setApiVersion', adapter.client.transport._config.apiVersion)
    return adapter
  }
}
