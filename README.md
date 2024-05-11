## 목표

claude chat 히스토리 내역 한번에 쭈루룩 쉽게 저장 -> 나중에
유료 결제해둔 상태라서 api 혜택 사용해보고자 함 -> 실패

- api, sdk 둘다 외부에서 들어가려면 추가 요금제로 변경해야함
  ![alt text](image.png)

직접 네트워크 콘솔창에서 요청 값 그대로 fetch 해보니 nosniff 로 탐지됨

```
api ok
h3=":443"; ma=86400
DYNAMIC
asdfasdf-ICN
keep-alive
82
script-src 'strict-dynamic' 'wasm-unsafe-eval' https: 'nonce-asdfasdf'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; upgrade-insecure-requests; block-all-mixed-content
application/json
Sat, 11 May 2024 06:23:39 GMT
cloudflare
activitySessionId=asdfasdf; Path=/; Expires=Sat, 11 May 2024 18:23:39 GMT; Secure; HttpOnly; SameSite=lax
__cf_bm=asdfasdf; path=/; expires=Sat, 11-May-24 06:53:39 GMT; domain=.claude.ai; HttpOnly; Secure; SameSite=None
max-age=63072000; includeSubDomains; preload
RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url
1.1 google
asdfasdfasdfasdf
nosniff
SAMEORIGIN
/api/organizations/org-id/chat_conversations
1; mode=block
"test: \n headers:undefined\n body: [object Promise]\n 400Bad Request"
```

- 신기한 점 antrophic 인스턴스 활성화 된 상태에서는 claude 자체적으로 안들어가지는 현상 발견 (이따가 더 보기)
- 대안: 일단 수동으로 개발자 콘솔 창에서 응답요청 ai payload json 직접 복사하고 json 객체 파싱 & md 저장하는 정도로만 구현
- 대안 이후 해볼 것:
  - 기술적으로 어캐 막아둔건지 기웃거려보기 (개념 공부 + 자료 조사)
  - claude 버리고 https://chat.lmsys.org/ gpt 2 좀 더 써보고 갈아타던가 해야겠다
