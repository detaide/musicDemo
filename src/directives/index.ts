const modules = import.meta.glob('./**/*.ts')

let directives : any = {}


async function loadModule() {
    for (const [path, module] of Object.entries(modules)) {
      const list = await module() as any
      for (const key in list) {
        directives[key] = list[key]
      }
    }
  }


await loadModule()

export  {directives}