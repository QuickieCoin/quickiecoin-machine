
const coins = {
  BTC: {
    displayScale: 6,
    unitScale: 8,
    zeroConf: true
  },
  ETH: {
    displayScale: 16,
    unitScale: 18,
    zeroConf: false
  },
  ZEC: {
    unitScale: 8,
    displayScale: 6,
    zeroConf: true
  },
  LTC: {
    displayScale: 6,
    unitScale: 8,
    zeroConf: true
  },
  DASH: {
    displayScale: 6,
    unitScale: 8,
    zeroConf: true
  },
  BCH: {
    displayScale: 6,
    unitScale: 8,
    zeroConf: true
  }
}

module.exports = {coins, depositUrl, parseUrl, formatAddress}

const plugins = {
  BTC: require('./btc'),
  ETH: require('./eth'),
  ZEC: require('./zec'),
  LTC: require('./ltc'),
  DASH: require('./dash'),
  BCH: require('./bch')
}

function depositUrl (cryptoCode, address, amountStr) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.depositUrl(address, amountStr)
}

function coinPlugin (cryptoCode) {
  const plugin = plugins[cryptoCode]
  if (!plugin) throw new Error(`Unsupported coin: ${cryptoCode}`)
  return plugin
}

function parseUrl (cryptoCode, network, url) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.parseUrl(network, url)
}

function formatAddress (cryptoCode, address) {
  const plugin = coinPlugin(cryptoCode)
  if (!plugin.formatAddress) return address
  return plugin.formatAddress(address)
}
