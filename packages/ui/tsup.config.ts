import { defineConfig } from 'tsup'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

// Externalize everything we declare as a dependency or peer — consumers install
// these via npm; we don't bundle Radix/React/etc. into the published output.
const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}(/.*)?$`))

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external,
})
