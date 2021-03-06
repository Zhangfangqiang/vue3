export default [
  {
    path: '/',
    name: 'Home',
    alias: '/topics',
    component: () => import('@/views/Home')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/users/1/edit',
    name: 'UsersEdit',
    component: () => import('@/views/users/Edit'),
    children: [
      {
        path: '',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile.vue'),
        meta: { auth: true }  //auth 为 true，标识当前路由需要登录才能访问
      },
      {
        path: '/users/1/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password.vue'),
        meta: { auth: true }  //auth 为 true，标识当前路由需要登录才能访问
      },
      {
        path: '/users/1/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar.vue'),
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  {
    path: '/:user',
    component: () => import('@/views/articles/Column'),
    children: [
      {
        path: '',
        name: 'Column',
        component: () => import('@/views/articles/List.vue')
      },
      {
        path: '/articles/:articleId/content',
        name: 'Content',
        component: () => import('@/views/articles/Content.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
]
