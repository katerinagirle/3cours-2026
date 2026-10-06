const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks
  })
}

const htmlPages = [
  createPages('./src/index.html', './index.html', ['index']),
  createPages('./src/pages/rps-react.html', './rps-react.html', ['index', 'rpsreact']),
  createPages('./src/pages/memory.html', './memory.html', ['memory']),
  createPages('./src/pages/memory-react.html', './memory-react.html', ['memoryreact']),
]

module.exports = htmlPages
