# Setup

1. `npm install`
2. Update `@types/chrome` dependency. First delete node modules, then delete that from package json, and then reinstall it with `npm i -D @types/chrome`
3. Delete the git repo.
4. Run `npm run dev`, which will build a `dist` folder
5. Load unpacked the `dist` folder in the **Manage Extensions** page

```bash
rm -rf .git
git init
npm install
npm run dev
```

## Useful stuff

- https://usehooks-ts.com/react-hook/use-debounce-value
