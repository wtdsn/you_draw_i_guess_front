
# vite 项目中路径别名的问题
如果是 vite + js 的项目。在 viteconfig.js 中配置
```js
  resolve: {
    alias: {
      "@": resolve(__dirname, './src')
    }
  },
```
就行了

如果是 ts 还需要再 tsconfig.json 中配置
```json
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
```