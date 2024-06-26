export const navRoutes:NavRouteType[] = [
  {
    path: 'utils',
    title: 'utils',
    children: [
      {
        path: 'defer',
        title: 'defer'
      },
      {
        path: 'date',
        title: 'date'
      },
      {
        path: 'cookie',
        title: 'cookie'
      },
      {
        path: 'etc',
        title: 'etc'
      },
    ]
  },
  {
    path: 'hooks',
    title: 'hooks',
    children: [
      {
        path: 'infiniteScroll',
        title: 'infiniteScroll'
      },
      {
        path: 'isomorphicLayoutEffect',
        title: 'isomorphicLayoutEffect'
      },
      {
        path: 'reloadService',
        title: 'reloadService'
      },
    ]
  },
  {
    path: 'nextjs',
    title: 'next.js 14'
  },
  {
    path: 'react',
    title: 'react',
    children: [
      {
        path: '18',
        title: 'v18'
      },
      {
        path: '19',
        title: 'v19'
      }
    ]
  },
  {
    path: 'board',
    title: 'drag & drop'
  },
  {
    path: 'chart',
    title: 'chart',
    children: [
      {
        path: 'radar',
        title: 'radar'
      },
      {
        path: 'custom-radar',
        title: 'radar/custom',
      },
      {
        path: 'line',
        title: 'line'
      },
    ]
  },
  {
    path: 'geolocation',
    title: 'geolocation'
  },
  {
    path: 'navigation',
    title: 'navigation',
    children: [
      {
        path: 'horizontal/basic',
        title: 'horizontal-basic'
      },{
        path: 'vertical/basic',
        title: 'vertical-basic'
      },
    ]
  },
  {
    path: 'slide',
    title: 'slide',
    children: [
      {
        path: 'basic',
        title: 'basic'
      }
    ]
  },
  {
    path: 'client-rect',
    title: 'clientRect'
  },
  {
    path: 'css',
    title: 'css',
    children: [
      {
        path: 'perspective',
        title: 'perspective'
      }
    ]
  },
  {
    path: 'http',
    title: 'http',
    children: [
      {
        path: 'cache',
        title: 'cache'
      }
    ]
  },
]
