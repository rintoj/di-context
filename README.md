# Dependency Injection Library (di-context)

This is a dependency injection library written for TypeScript based project, especially for React and React-Native project in TypeScript

# Install

```bash
npm install --save di-context
```

# Usage

## 1. Provide

Use `@provide()` decorator to instructor this library to remember a class by type or a value by name. If a class is passed, the library would initialize a singleton object.

```ts
import { provide, provideValue } from 'di-context'

// method: 1 (resolvable through inject by type)
@provide()
export class UserService {
  ....
}

// method: 2 (resolvable through inject by name)
@provide('userService')
export class UserService {
  ....
}

// method: 3 (resolvable through inject by type)
@provideValue(NavService, new NavService())

// method: 4 (resolvable through inject by name)
@provideValue('navService', new NavService())
```

## 2. Inject Values

Inject values using `@bind()` decorator. You can inject by type or name

```ts
import { bind } from 'di-context'

export class SignInScreen extends React.Component<Props, State> {

  // method 1: inject by type
  @bind()
  private userService: UserService

  // method 2: inject by name
  @bind('navService')
  private navService: NavService
}
```

## Contributing
Contributions are welcome! Send a pull request. Feel free to contact me or checkout my [GitHub](https://github.com/rintoj) page.

## Author

**Rinto Jose** (rintoj)

Follow me:
  [GitHub](https://github.com/rintoj)
| [Facebook](https://www.facebook.com/rinto.jose)
| [Twitter](https://twitter.com/rintoj)
| [Google+](https://plus.google.com/+RintoJoseMankudy)
| [Youtube](https://youtube.com/+RintoJoseMankudy)

## Versions
[Check CHANGELOG](./CHANGELOG.md)

## License
```
The MIT License (MIT)

Copyright (c) 2017 Rinto Jose (rintoj)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```