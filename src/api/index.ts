const modules = import.meta.glob('./**/*.ts')

let api : any = {}


async function loadModule() {
    for (const [path, module] of Object.entries(modules)) {
      const list = await module() as any
      for (const key in list) {
        api[key] = list[key]
      }
    }
  }


await loadModule()

export  {api}





// Object.entries(modules).forEach(([path, module]) => {
//     const fileName = path.replace(/^.\/(.*)\.ts$/, '$1')
//     Object.entries(module).forEach(([exportName, exportedValue]) => {
//       if (exportName !== 'default') {
//         exports[`${fileName}_${exportName}`] = exportedValue
//       } else {
//         exports[fileName] = exportedValue
//       }
//     })
//   })