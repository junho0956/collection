import styled from "styled-components";
import { PrismLight as Highlighter } from "react-syntax-highlighter";
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import docker from 'react-syntax-highlighter/dist/cjs/languages/prism/docker';
import { Link } from "react-router-dom";

Highlighter.registerLanguage('docker', docker);

export default function OptDocker() {
  const baseCode = `
FROM node:18-alpine
RUN apk add --no-cache libc6-compat
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 3000
CMD ["node",".next/standalone/server.js"]
  `
  const optCode = `
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /

COPY yarn.lock* ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /
COPY --from=deps /node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /.next/static ./.next/static

USER nextjs

EXPOSE 3000

#ENV PORT 3000
#ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
  `
  return (
    <Wrapper>
      <p>NextJS 기반 프로젝트를 도커로 서비스 해야하는 상황이 생겨서 최적화된 Dockerfile 코드를 메모</p><br/>
      <p>가장 초기에 사용한 Dockerfile, 이미지 빌드 용량이 무려 3.9GB에 달했다..</p>
      <Highlighter style={coldarkDark}>{baseCode}</Highlighter><br/>
      <p>4GB에 육박하는 크기를 클라우드 레지스트리랑 연결하는 경우 자치 잘못하면 내 월급이 사라질지도 모른다...</p>
      <Link to="https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile" target="_blank">
        https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
      </Link><br/>
      <p>vercel 팀에서 직접 작성한 nextjs dockerfile example 인데, 필요한 것만 가져와서 최적화된 Dockerfile 을 구성했다.</p>
      <p>그 결과, 용량은 1/10 가량인 300MB 까지 줄일 수 있게 되어 내 월급을 무사히 지킬 수 있었다.</p>
      <Highlighter style={coldarkDark}>{optCode}</Highlighter><br/>
      <p>중간 중간 segment fault 같은 여러가지 에러를 만났는데 시간을 투자하니 해결되었다. 어떻게 했는지는 기억안나서 패스</p><br/>
      <p>deps, builder, runner 이렇게 3가지 형태로 target이 분류되어 있으며</p>
      <p>기초 코드랑 같겠지만 standalone output 의 결과물인 server.js 로 배포된다.</p>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 20px;
  
  a {
    color: blue;
  }
`

/*

#FROM node:18-alpine
#RUN apk add --no-cache libc6-compat
#COPY yarn.lock ./
#RUN yarn install --frozen-lockfile
#COPY . .
#RUN yarn run build && rm -rf .next/cache
#EXPOSE 3000
#CMD ["node",".next/standalone/server.js"]

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /

COPY yarn.lock* ./
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /
COPY --from=deps /node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /.next/static ./.next/static

USER nextjs

EXPOSE 3000

#ENV PORT 3000
# set hostname to localhost
#ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]

*/