export const navRoutes:NavRouteType[] = [
  {
    path: 'board',
    title: 'drag & drop'
  },
  {
    path: 'docker',
    title: 'docker',
    children: [
      {
        path: 'opt',
        title: 'optimization(Next.js)'
      }
    ]
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
]