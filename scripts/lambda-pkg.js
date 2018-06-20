const { cd, cp, exec, ln, mkdir } = require('shelljs')
const path = require('path')

const lambdaPkg = async () => {
  const projectPath = path.join(__dirname, '..')
  try {
    await execute(`cp -r ${projectPath}/dist ${projectPath}/deploy`)
  } catch (error) {
    throw new Error('Error copying dist directory')
  }

  try {
    await execute(
      `cp -r ${projectPath}/node_modules ${projectPath}/deploy/node_modules`
    )
  } catch (error) {
    throw new Error('Error copying node modules')
  }

  cd(`${projectPath}/deploy`)

  try {
    await execute('zip -r ../deploy.zip *')
  } catch (error) {
    throw new Error('Error zipping deploy dir')
  }
}

const execute = cmd => {
  return new Promise((resolve, reject) => {
    const output = exec(cmd)
    const { stdout, stderr, code } = output

    if (code) {
      reject({ stdout, stderr, code })
    } else {
      resolve(stdout)
    }
  })
}

module.exports = lambdaPkg

if (require.main === module) {
  lambdaPkg()
}
