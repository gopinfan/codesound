# 常用知识点

## Laravel Mix 前端工作流

安装扩展

``` bash
$ yarn install --no-bin-links
$ yarn add cross-env
```

编译前端文件

``` bash
$ npm run dev
```

或者实时监控文件变化

``` bash
$ npm run watch-poll
```

## 引用视图

使用 `@include` 引用视图

## 模型操作

`User::find(1)`

`User::findOrFail(1)`

`User::first()`

`User::all()`

`$user->save()`

`$user->update()`

`User::create()`

## 资源路由

`Route::resource('users', 'UsersController')`

| HTTP 请求 | URL | 动作 | 作用 |
| -------- | --- | --- | --- |
| GET | /users | UsersController@index | 显示所有用户列表的页面 |
| GET | /users/{user} | UsersController@show | 显示用户个人信息的页面 |
| GET | /users/create | UsersController@create | 创建用户页面 |
| POST | /users | UsersController@store | 创建用户 |
| GET | /users/{user}/edit | UsersController@edit | 编辑用户资料的页面 |
| PATCH | /users/{user} | UsersController@update | 更新用户 |
| DELETE | /users/{user} | UsersController@destroy | 删除用户 |

## 模板中显示旧输入数据

`old('name')` 显示旧的输入数据

## 控制器中数据验证

`validate($request, $rules)`

## 模板令牌

``` html
{{ csrf_token() }}
```

``` html
{{ csrf_field() }}
```

``` html
@csrf
```

## 错误信息

``` html
@if (count($errors) > 0)
    @foreach($errors->all() as $error)
        {{$error}}
    @endforeach
@endif
```

## 语言包

Laravel 5 语言包

[https://github.com/overtrue/laravel-lang](https://github.com/overtrue/laravel-lang)

``` bash
$ composer require "overtrue/laravel-lang:~3.0"
```

config/app.php

``` php
<?php

return [
    .
    .
    .
    'locale' => 'zh-CN',
    .
    .
    .
];
```

## 会话 Session

`session()->flash('name', 'message')`

`session()->has('name')`

`session()->get('name')`

## Auth 授权认证

用户身份认证

    // 用户存在于数据中，且邮箱和密码相符
    Auth::attempt(['email' => $email, 'password' => $password])

获取当前登录用户的信息

    Auth::user()

判断用户是否登录

    Auth::check()

用户登录

    Auth::login($user)

用户退出

    Auth::logout()

## 创建表单请求方法的隐藏域

``` html
{{ method_field('DELETE') }}
```

或者

``` html
@method('DELETE')
```

## Auth 中间件进行身份验证

`except` 黑名单过滤

`only` 白名单过滤

``` php
class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except' => ['show', 'create', 'store']
        ]);
    }
    .
    .
    .
}
```

## 使用 Auth 中间件的 guest 指定只允许未登录用户访问的动作

只让未登录用户访问登录页面

app/Http/Controllers/SessionsController.php

``` php
<?php

namespace App\Http\Controllers;
.
.
.
class SessionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest', [
            'only' => ['create']
        ]);
    }
    .
    .
    .
}
```

只让未登录用户访问注册页面

app/Http/Controllers/UsersController.php

``` php
<?php

namespace App\Http\Controllers;
.
.
.
class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except' => ['show', 'create', 'store']
        ]);

        $this->middleware('guest', [
            'only' => ['create']
        ]);
    }
    .
    .
    .
}
```

## 授权策略

使用授权策略对已登录用户进行限制

生成授权策略文件

``` bash
$ php artisan make:policy UserPolicy
```

添加授权策略方法

app/Policies/UserPolicy.php

``` php
<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;

class UserPolicy
{
    use HandlesAuthorization;

    public function update(User $currentUser, User $user)
    {
        return $currentUser->id === $user->id;
    }
}
```

在 `AuthServiceProvider` 类中对授权策略进行设置

app/Providers/AuthServiceProvider.php

``` php
<?php

namespace App\Providers;
.
.
.
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        \App\Models\User::class  => \App\Policies\UserPolicy::class,
    ];
    .
    .
    .
}
```

在控制器方法中使用 `authorize` 方法验证用户授权

``` php
$this->authorize('update', $user);
```

## 使用 redirect()->intended() 重定向

``` php
redirect()->intended()
```

## 假数据生成器

使用 `Faker` 为模型工厂生成假数据

[https://github.com/fzaninotto/Faker](https://github.com/fzaninotto/Faker)

在 `config/app.php` 中配置支持中文

``` php
'faker_locale' => 'zh_CN',
```