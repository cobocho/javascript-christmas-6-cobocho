# 🚀 기능 요구 사항

#### 12월 이벤트 계획

- 크리스마스 디데이 할인
  - 이벤트 기간: 2023.12.1 ~ 2023.12.25
  - 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
  - 총주문 금액에서 해당 금액만큼 할인  
    (e.g. 시작일인 12월 1일에 1,000원, 2일에 1,100원, ..., 25일엔 3,400원 할인)
- 평일 할인(일요일~목요일): 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
- 주말 할인(금요일, 토요일): 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
- 특별 할인: 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
- 증정 이벤트: 할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
- 이벤트 기간: '크리스마스 디데이 할인'을 제외한 다른 이벤트는 2023.12.1 ~ 2023.12.31 동안 적용

#### 혜택 금액에 따른 12월 이벤트 배지 부여

- 총혜택 금액에 따라 다른 이벤트 배지를 부여합니다. 이 배지는 2024 새해 이벤트에서 활용할 예정입니다.
  배지에 따라 새해 이벤트 참여 시, 각각 다른 새해 선물을 증정할 예정입니다.
  - 5천 원 이상: 별
  - 1만 원 이상: 트리
  - 2만 원 이상: 산타

#### 고객에게 안내할 이벤트 주의 사항

- 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
- 음료만 주문 시, 주문할 수 없습니다.
- 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.  
  (e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)

#### '12월 이벤트 플래너' 개발 요청 사항

- 고객들이 식당에 방문할 날짜와 메뉴를 미리 선택하면 이벤트 플래너가 주문 메뉴, 할인 전 총주문 금액, 증정 메뉴, 혜택 내역, 총혜택 금액, 할인 후 예상 결제 금액, 12월 이벤트 배지 내용을 보여주기를 기대합니다.
- 12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)
  - 방문할 날짜는 1 이상 31 이하의 숫자로만 입력받아 주세요.
  - 1 이상 31 이하의 숫자가 아닌 경우, "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - 모든 에러 메시지는 "[ERROR]"로 시작하도록 작성해 주세요.
- 주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)
  - 고객이 메뉴판에 없는 메뉴를 입력하는 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - 메뉴의 개수는 1 이상의 숫자만 입력되도록 해주세요. 이외의 입력값은 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - 메뉴 형식이 예시와 다른 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - 중복 메뉴를 입력한 경우(e.g. 시저샐러드-1,시저샐러드-1), "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - 모든 에러 메시지는 "[ERROR]"로 시작하도록 작성해 주세요.
- 주문 메뉴의 출력 순서는 자유롭게 출력해 주세요.
- 총혜택 금액에 따라 이벤트 배지의 이름을 다르게 보여 주세요.
- 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격
- 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
- 증정 메뉴
  - 증정 이벤트에 해당하지 않는 경우, 증정 메뉴 "없음"으로 보여 주세요.
- 혜택 내역
  - 고객에게 적용된 이벤트 내역만 보여 주세요.
  - 적용된 이벤트가 하나도 없다면 혜택 내역 "없음"으로 보여 주세요.
  - 혜택 내역에 여러 개의 이벤트가 적용된 경우, 출력 순서는 자유롭게 출력해주세요.
- 이벤트 배지
  - 이벤트 배지가 부여되지 않는 경우, "없음"으로 보여 주세요.
- 적용된 이벤트가 하나도 없는 경우는 아래 예시를 참고해 주세요.

```
안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.
12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)
26
주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)
타파스-1,제로콜라-1
12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!

<주문 메뉴>
타파스 1개
제로콜라 1개

<할인 전 총주문 금액>
8,500원

<증정 메뉴>
없음

<혜택 내역>
없음

<총혜택 금액>
0원

<할인 후 예상 결제 금액>
8,500원

<12월 이벤트 배지>
없음
```

#### 기대하는 '12월 이벤트 플래너'의 예시 모습

```
안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.
12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)
3
주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)
티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1
12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!

<주문 메뉴>
티본스테이크 1개
바비큐립 1개
초코케이크 2개
제로콜라 1개

<할인 전 총주문 금액>
142,000원

<증정 메뉴>
샴페인 1개

<혜택 내역>
크리스마스 디데이 할인: -1,200원
평일 할인: -4,046원
특별 할인: -1,000원
증정 이벤트: -25,000원

<총혜택 금액>
-31,246원

<할인 후 예상 결제 금액>
135,754원

<12월 이벤트 배지>
산타
```

# 🛠️ 구조 설계

## Controller

- Controller

## Domain

- Food
  - Appetizer
  - MainCourse
  - Dessert
  - Drink
- OrderDetail
- FoodProvider
- Receipt
- Scheduler
- Badge

## Service

- OrderService
- GiftService
- DiscountService
- BadgeService

## View

- InputView
- OutputView

**Food**

<table>
  <tr>
    <th>name</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>name</td>
    <td>음식의 이름입니다.</td>
  </tr>
  <tr>
    <td>price</td>
    <td>음식의 원가와 할인액입니다.</td>
  </tr>
</table>

<table>
  <tr>
    <th>메서드</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>getCostAmount()</td>
    <td>음식의 원가를 반환합니다.</td>
  </tr>
  <tr>
    <td>getDiscountAmount()</td>
    <td>음식의 할인액을 반환합니다.</td>
  </tr>
  <tr>
    <td>getPaymentAmount()</td>
    <td>음식의 결제액을 반환합니다.</td>
  </tr>
  <tr>
    <td>dDayDiscount()</td>
    <td>음식의 결제액을 반환합니다.</td>
  </tr>
  <tr>
    <td>dDayDiscount()</td>
    <td>음식의 결제액을 반환합니다.</td>
  </tr>
  <tr>
    <td><code>abstract</code>weekdaysDiscount()</td>
    <td>평일 할인 메서드입니다.</td>
  </tr>
  <tr>
    <td><code>abstract</code>weekendDiscount()</td>
    <td>음식의 결제액을 반환합니다.</td>
  </tr>
</table>

## Views

**InputView**

- 사용자로부터 입력을 받는다.

**OutputView**

- 콘솔에 메세지를 출력한다.

# 🔍 클래스 다이어그램

# 🚦 순서도

# ⚙️ 기능 구현 목록

## PHASE 1 (총 주문 금액 계산)

- [ ] 메뉴를 입력하면 총 주문 금액을 계산한다.
  - [ ] 메뉴를 입력하면 입력 값을 파싱한다.
  - [ ] 입력한 메뉴에 따라서 `Receipt`를 생성한다.
  - [ ] `Receipt`의 `getPrice()`를 호출하고 반환값의 `cost` 프로퍼티에 접근 시 총 계산값이 나타난다.

## 도메인 구현

- [ ] Food
  - [ ] 인자로

## Service 구현

## Controller 연결

- [ ] `Controller`에 `Service`와 `View`를 연결한다.
- [ ] `Controller`에 에러 핸들링 추가

# 과제 진행 요구 사항

# ✅ 최종 체크포인트

- [ ] `ApplicationTest`를 통과하는가?
- [ ] 모든 단위 테스트가 통과하는가?
- [ ] 뎁스가 과도하게 깊은 메서드는 존재하지 않는가?
- [ ] 컨벤션에 맞게 코드가 작성되었는가?
- [ ] Node.js 18.17.1 버전에서 실행 가능한가?
- [ ] `package.json`에 변경사항이 존재하지 않는가?
- [ ] `process.exit()`를 호출하는 코드가 존재하지 않는가?
- [ ] 컨트롤러에서 에러 핸들링이 이루어지는가?

# 💻 테스트 실행 결과

테스트 실행 전에 더미 입력값을 테스트 수트에서 제외하기 위해서 `package.json`의 `"jest"를

```json
  "jest": {
    "transform": {
      "\\.js$": "babel-jest"
    },
    "testMatch": [
      "**/*.test.js",
      "ApplicationTest.js"
    ]
  },
```

위와 같이 설정해주세요!
