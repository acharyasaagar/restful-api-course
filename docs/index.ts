import fs from 'fs'
import path from 'path'
import raml2html from 'raml2html'

import chalk from 'chalk'
import { Application } from 'express'

const configWithDefaultTheme = raml2html.getConfigForTheme()

export default class ApiDoc {
  public ramlFile = path.join(__dirname, '/api.raml')
  public indexHTMLFile = path.join(__dirname, '/index.html')

  constructor() {
    this.generateDocumentation = this.generateDocumentation.bind(this)
  }

  public async generateDocumentation(app: Application) {
    try {
      // tslint:disable-next-line:no-console
      const html = await raml2html.render(this.ramlFile, configWithDefaultTheme)
      fs.writeFile(this.indexHTMLFile, html, 'utf8', err => {
        if (err) throw err
        // tslint:disable-next-line:no-console
        console.log(
          chalk.yellow(`  API documentation generated. Documentation now can be accessed through /docs route
        `)
        )
      })
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err)
    }
  }
}
