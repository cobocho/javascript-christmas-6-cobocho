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
- Discounter
  - DDayDiscounter
  - DayOfWeekDiscounter
  - SpecialDiscounter
- OrderDetail
- OrderTaker
- AdditionalDiscount
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

## Views

**InputView**

- 사용자로부터 입력을 받는다.

**OutputView**

- 콘솔에 메세지를 출력한다.

# 🔍 클래스 다이어그램

# 🚦 순서도

# ⚙️ 기능 구현 목록

## PHASE 1 (이벤트 일정 관리)

- [x] 일자를 입력하면 이벤트인지 판별한다.
  - [x] 특정 일자가 이벤트 해당 일인지 판별한다.

## 도메인 구현

- [x] Scheduler

  - [x] `isEventDate` 호출 시 해당 일자가 이벤트 진행 일자인지 판별한다.
  - [x] `addEventDate` 호출 시 해당 일자를 이벤트 진행 일자에 추가한다.
  - [x] `addEventPeriod` 호출 시 해당 기간를 이벤트 진행 일자에 추가한다.
  - [x] `addEventMonth` 호출 시 해당 월을 이벤트 진행 일자에 추가한다.

- [x] Scheduler 예외 처리
  - [x] 올바른 날짜가 아닌 값이 나타나면 에러를 발생한다.
  - [x] `addEventPeriod` 호출 시 에러를 시작일보다 종료일이 이르면 에러를 발생한다.

## PHASE 2 (총 주문 금액 계산)

- [x] 메뉴를 입력하면 총 주문 금액을 계산한다.
  - [x] 메뉴를 입력하면 입력 값을 파싱한다.
  - [x] 입력한 메뉴에 따라서 `Receipt`를 생성한다.
  - [x] `Receipt`의 `getPrice()`를 호출하고 반환값의 `cost` 프로퍼티에 접근 시 총 계산값이 나타난다.
  - [x] 동일 메뉴 주문시 에러가 발생한다.
  - [x] 1개 이하 주문시 에러가 발생한다.
  - [x] 총 20개 이상 주문시 에러가 발생한다.
  - [x] 음료수만 주문시 에러가 발생한다.

## 도메인 구현

- [x] Food

  - [x] 인자로 `name`과 `price`를 받는다.
  - [x] `getPrice` 호출 시 `PriceInfo`를 반환한다.

- [x] OrderDetail

  - [x] 인자로 `foodName`과 `quantity`를 받는다.
  - [x] `getQuantity` 호출 시 `foods`의 갯수를 반환한다.
  - [x] `getFoods` 호출 시 `quantity` 만큼의 `Food`를 반환한다.
  - [x] `getPrice` 호출 시 `PriceInfo`를 반환한다.
  - [x] `toString` 호출 시 `${name} ${quantity}개`를 반환한다.

- [x] OrderTaker

  - [x] `takeOrder` 호출 시 `OrderDetail`을 반환한다.

- [x] OrderTaker 예외 처리

  - [x] 존재하지 않는 메뉴일시 에러가 발생한다.
  - [x] 1개 이하 주문시 에러가 발생한다.

- [x] Receipt

  - [x] `order` 호출 시 `orderDetails`에 `OrderDetail`이 추가된다.
  - [x] `getAllFoods` 호출 시 모든 `orderDetails`의 모든 `Food`를 반환한다.
  - [x] `getPrice` 호출 시 `ReceiptPriceInfo`를 반환한다.

- [x] Receipt 예외 처리

  - [x] 발행일자가 유효하지 않으면 에러가 발생한다.
  - [x] 동일 메뉴 주문시 에러가 발생한다.
  - [x] 총 20개 이상 주문시 에러가 발생한다.
  - [x] 음료수만 주문시 에러가 발생한다.

## PHASE 3 (증정 메뉴)

- [x] 할인 전 총 가격에 따라 메뉴를 증정한다.
  - [x] 이벤트 기간인지 확인한다.
  - [x] 할인 전 총 가격이 12만원 이상이면 샴페인을 1개 증정한다.

## 도메인 구현

- [x] OrderTaker

  - [x] `giveaway` 호출 시 총 가격에 따라 가격이 음수인 `OrderDetail` 리스트를 반환한다.

- [x] Receipt

  - [x] `receiveGifts` 호출 시 현재 총 주문금액에 따라 `orderDetails`에 가격이 음수인 `OrderDetail`이 추가된다.

## PHASE 4 (크리스마스 이벤트)

- [x] 크리스마스 디데이 할인을 구현합다.
  - [x] 이벤트 기간인지 확인한다.
  - [x] 크라스마스가 다가올수록 할인금액이 100원씩 증가한다.
  - [x] 크리스마스가 지나면 할인이 일어나지 않는다.

## 도메인 구현

- [x] Discounter

  - [x] `run` 호출 시 영수증에 할인을 반영한다.
  - [x] 10,000원 이상 시에만 할인을 반영한다.

- [x] DDayDiscounter

  - [x] `run` 호출 시 d-day에 비례해 할인을 반영한다.
  - [x] 크리스마스가 지나면 할인이 일어나지 않는다.

## PHASE 5 (요일 할인 이벤트)

- [x] 요일 할인을 구현합다.

  - [x] 이벤트 기간인지 확인한다.
  - [x] 방문일의 요일을 확인한다.
  - [x] 평일일시 디저트 메뉴를 1개당 2,023원 할인한다.
  - [x] 주말일시 디저트 메뉴를 1개당 2,023원 할인한다.

## 도메인 구현

- [x] DayOfWeekDiscounter

  - [x] 평일일시 디저트 메뉴를 1개당 2,023원 할인한다.
  - [x] 주말일시 디저트 메뉴를 1개당 2,023원 할인한다.

## PHASE 6 (특별 할인 이벤트)

- [x] 특별 할인을 구현합다.

  - [x] 이벤트 기간인지 확인한다.
  - [x] 방문일의 이벤트 여부를 확인한다.
  - [x] 방문일이 이벤트일 일시 총 주문금액에서 1,000원 할인한다.

## 도메인 구현

- [x] SpecialDiscounter

  - [x] 방문일이 이벤트일 일시 총 주문금액에서 1,000원 할인한다.

# 🔍 클래스 다이어그램

![](https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/10134308-d905-43b3-bfe1-7591e8031a36)

# 🚦 프로세스 요약

<img width="1337" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/2fad6650-2bd1-4b74-b2d3-5495efbea5f9">

## 영수증 생성

<img width="800" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/ead74bdf-3a01-40f0-8378-1ccf2e78ebec">

```js
// OrderService.js
const receiptDate = new Date(dateStringGenerator({ ...SYSTEM.date, day: date }));
```
- 사용자가 입력한 값을 기반으로 시스템의 디폴트 일자를 기반으로한 발행일자를 생성한다.

```js
// Receipt.js
  #validate(date) {
    if (isInvalidDate(date)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidDate);
    }
  }
```
- 발행일자의 유효성 검사를 진행한다.

```js
// OrderService.js
return Receipt.of(receiptDate);
```
- 생성된 영수증을 반환한다.

## 메뉴 주문

<img width="800" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/64813864-8715-4297-be39-9ecd45a52d0b">

```js
// Controller.js
  async #readOrderMenus() {
    const menus = (await this.#view.input.readOrderMenus()).split(SYSTEM.menuSeparator);
    const orders = Array.from(menus, (menu) => {
      const [name, quantity] = menu.split(SYSTEM.priceSeparator);
      return { name, quantity: Number(quantity) };
    });

    return orders;
  }
```
- 사용자가 입력한 주문을 파싱한다.

```js
// OrderService.js
const orderDetails = Array.from(orders, (order) => {
  const { name, quantity } = order;
  return OrderTaker.takeOrder(name, quantity);
});

// OrderTaker.js
  takeOrder(name, quantity) {
    const { foodName, price, foodCategory } = this.findMenu(name);
    const MIN_QUANTITY = 1;

    if (quantity < MIN_QUANTITY || !Number.isInteger(quantity)) {
      throw new ApplicationError(this.ERROR_MESSAGES.invalidOrder);
    }
    const orderDetail = OrderDetail.of({ foodName, price, foodCategory, quantity });

    return orderDetail;
  },

  findMenu(name) {
    const result = this.menu.find((food) => food.foodName === name);

    if (!result) {
      throw new ApplicationError(this.ERROR_MESSAGES.invalidOrder);
    }

    return result;
  },
```
- `OrderTaker`에게 주문을 요청해 `OrderDetail`을 생성한다.

```js
// OrderService.js
receipt.order(orderDetails);
```
- 생성한 `OrderDetail`을 `Receipt`에 반영한다.

```js
// Receipt.js
  #validateOrderDetails(orders) {
    const names = Array.from(orders, (order) => order.getName());
    const totalQuantity = orders.reduce((total, order) => total + order.getQuantity(), 0);
    const allFoods = Array.from(orders, (order) => order.getFoods()).flat();
    if (isDuplicated(names)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
    if (totalQuantity > Receipt.MAX_FOOD_QUANTITY) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
    if (allFoods.every((food) => food instanceof Drink)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
  }
```
- 생성된 `OrderDetail`이 주문 조건에 부합한지 유효성 검사를 진행한다.

## 증정품 부여

<img width="800" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/2fc4a7ad-1028-4e06-bf39-6b1bbc0c9802">

```js
// GiftService.js
  giveaway(receipt) {
    const giftEventScheduler = Scheduler.of();
    giftEventScheduler.addEventMonth(GiftService.EVENT_PERIOD.year, GiftService.EVENT_PERIOD.month);
    if (giftEventScheduler.isEventDate(receipt.getDate())) {
      return null;
    }
    // ...
});
```
- 증정 이벤트의 기간을 `Scheduler`에 설정한 후 `Receipt`의 발행일자로 이벤트 기간인지 체크한다.

```js
// GiftService.js
const gifts = OrderTaker.giveaway(receipt.getPrice().payment);

// OrderTaker.js
  giveaway(costPrice) {
    if (typeof costPrice !== 'number') {
      throw new ApplicationError(OrderTaker.ERROR_MESSAGES.notNumberPrice);
    }

    const gifts = this.gifts.filter((giveaway) => giveaway.minimumCost <= costPrice);

    return Array.from(gifts, ({ giftName }) => {
      const { foodName, foodCategory, price } = this.findMenu(giftName);
      return OrderDetail.of({ foodName, price, foodCategory, quantity: 1 });
    });
  },
```
- `OrderTaker`에 주문 전 금액을 기입해 증정품을 반환받는다.

```js
// GiftService.js
receipt.receiveGifts(gifts);
```
- 반환받은 증정품을 `Receipt`에 기입한다.

## 크리스마스 디데이 이벤트

<img width="800" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/1b3a4b0d-a8df-4dce-b508-d2ec4c16a464">

```js
// DiscountService.js
const discounter = DDayDiscounter.of();
const result = discounter.run(receipt);
```
- `DDayDiscounter`를 생성한 후 `Receipt`을 기입한다.

```js
// DDayDiscounter.js
  _discount(receipt) {
    if (!this.#isEventPeriod(receipt.getDate())) {
      return null;
    }
    // ...
  }

  #isEventPeriod(visitDate) {
      const scheduler = Scheduler.of();
      const { start, end } = DDayDiscounter.PERIOD;
      scheduler.addEventPeriod(new Date(start), new Date(end));
  
      return scheduler.isEventDate(visitDate);
  }
```
- 입력받은 `Receipt`의 발행일자가 크리스마스 디데이 할인 이벤트 기간과 동일한지 판별한다.

```js
// DDayDiscounter.js
  _discount(receipt) {
    // ...
    const visitDate = receipt.getDate().getTime();
    const dayDifference = Math.floor((visitDate - DDayDiscounter.D_DAY) / (1000 * 60 * 60 * 24));
    const reduction = DDayDiscounter.DISCOUNT_AMOUNT_PER_D_DAY * dayDifference;
    const discount = DDayDiscounter.MAX_DISCOUNT_AMOUNT + reduction;
    receipt.addAdditionalDiscount(AdditionalDiscount.of(DDayDiscounter.EVENT_NAME, discount));

    return { name: DDayDiscounter.EVENT_NAME, benefit: discount };
  }
```
- 25일과의 일자 차이를 계산한 후 결과값을 `Receipt`에 기입한다.

## 요일 할인 이벤트

<img width="800" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/d06bee85-677f-41d3-b80c-29bc7750121d">

```js
// DiscountService.js
const discounter = DayOfWeekDiscounter.of();
const result = discounter.run(receipt);
```
- `DayOfWeekDiscounter`를 생성한 후 `Receipt`을 기입한다.

```js
// DayOfWeekDiscounter.js
  _discount(receipt) {
    if (!this.#isEventPeriod(receipt.getDate())) {
      return null;
    }
    // ...
  }

  #isEventPeriod(visitDate) {
    const scheduler = Scheduler.of();
    const { start, end } = DayOfWeekDiscounter.PERIOD;
    scheduler.addEventPeriod(new Date(start), new Date(end));

    return scheduler.isEventDate(visitDate);
  }
```
- 입력받은 `Receipt`의 발행일자가 요일 할인 이벤트 기간과 동일한지 판별한다.

```js
// DayOfWeekDiscounter.js
  _discount(receipt) {
    const visitDate = receipt.getDate();
    if (!this.#isEventPeriod(visitDate)) {
      return null;
    }
    const { name, category } = this.#getDiscountInfo(isWeekday(visitDate));

    return this.#discountEventFoods({ name, category, receipt });
  }

  #discountEventFoods({ name, category, receipt }) {
    const beforeDiscountPrice = receipt.getPrice().discount;
    const foods = receipt.getAllFoods().filter((food) => food instanceof category);
    foods.forEach((food) => food.discount(DayOfWeekDiscounter.DISCOUNT_PER_FOOD));
    const benefit = receipt.getPrice().discount - beforeDiscountPrice;

    if (!benefit) {
      return null;
    }

    return {
      name,
      benefit,
    };
  }
```
- `Receipt`로부터 `Food` 목록을 받고 이벤트 조건에 따라 할인을 반영한다.


## 특별 할인 이벤트

<img width="800" alt="image" src="https://github.com/cobocho/javascript-christmas-6-cobocho/assets/99083803/d06bee85-677f-41d3-b80c-29bc7750121d">

```js
// DiscountService.js
const discounter = SpecialDiscounter.of();
const result = discounter.run(receipt);
```
- `SpecialDiscounter`를 생성한 후 `Receipt`을 기입한다.

```js
// SpecialDiscounter.js
  _discount(receipt) {
    if (!this.#isEventPeriod(receipt.getDate())) {
      return null;
    }
    // ...
  }

  #isEventPeriod(visitDate) {
    const scheduler = Scheduler.of();
    SpecialDiscounter.DAY_LIST.forEach((day) => scheduler.addEventDate(new Date(day)));

    return scheduler.isEventDate(visitDate);
  }
```
- 입력받은 `Receipt`의 발행일자가 특별 할인 일자인지 판별한다.

```js
// SpecialDiscounter.js
  _discount(receipt) {
    if (!this.#isEventPeriod(receipt.getDate())) {
      return null;
    }
    receipt.addAdditionalDiscount(
      AdditionalDiscount.of(SpecialDiscounter.EVENT_NAME, SpecialDiscounter.DISCOUNT_AMOUNT),
    );

    return { name: SpecialDiscounter.EVENT_NAME, benefit: SpecialDiscounter.DISCOUNT_AMOUNT };
  }
```
-  `Receipt`에 특별 할인을 반영한다.

# 배지 이벤트
```js
// BadgeService.js
  getBadge(receipt) {
    const badgeEventScheduler = Scheduler.of();
    badgeEventScheduler.addEventMonth(
      BadgeService.EVENT_PERIOD.year,
      BadgeService.EVENT_PERIOD.month,
    );
    if (!badgeEventScheduler.isEventDate(receipt.getDate())) {
      return null;
    }
    // ...
  },
```
- `Receipt`의 방문일자가 배지 이벤트 기간인지 확인한다.
  
```js
// BadgeService.js
  getBadge(receipt) {
    // ...
    const result = Badge.valueOf(receipt.getPrice().benefit);

    return result ? result.getName() : result;
  },

// Badge.js
  static valueOf(benefit) {
    const result = Badge.#BADGE_LIST.find((badge) => badge.minimumPrice <= benefit);
    return result ? result.badge : null;
  }
```
- `Receipt`의 혜택 금액에 따라 배지를 생성 후 반환한다.

# 기획팀 요구사항 다시 돌아보기

- [x] 크리스마스 디데이 할인
  - [x] 이벤트 기간: 2023.12.1 ~ 2023.12.25
  - [x] 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
  - [x] 총주문 금액에서 해당 금액만큼 할인  
         (e.g. 시작일인 12월 1일에 1,000원, 2일에 1,100원, ..., 25일엔 3,400원 할인)
- [x] 평일 할인(일요일~목요일): 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
- [x] 주말 할인(금요일, 토요일): 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
- [x] 특별 할인: 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
- [x] 증정 이벤트: 할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
- [x] 이벤트 기간: '크리스마스 디데이 할인'을 제외한 다른 이벤트는 2023.12.1 ~ 2023.12.31 동안 적용

#### 혜택 금액에 따른 12월 이벤트 배지 부여

- [x] 총혜택 금액에 따라 다른 이벤트 배지를 부여합니다. 이 배지는 2024 새해 이벤트에서 활용할 예정입니다.
      배지에 따라 새해 이벤트 참여 시, 각각 다른 새해 선물을 증정할 예정입니다.
  - [x] 5천 원 이상: 별
  - [x] 1만 원 이상: 트리
  - [x] 2만 원 이상: 산타

#### 고객에게 안내할 이벤트 주의 사항

- [x] 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
- [x] 음료만 주문 시, 주문할 수 없습니다.
- [x] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.  
       (e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)

#### '12월 이벤트 플래너' 개발 요청 사항

- [x] 고객들이 식당에 방문할 날짜와 메뉴를 미리 선택하면 이벤트 플래너가 주문 메뉴, 할인 전 총주문 금액, 증정 메뉴, 혜택 내역, 총혜택 금액, 할인 후 예상 결제 금액, 12월 이벤트 배지 내용을 보여주기를 기대합니다.
- [x] 12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)
  - [x] 방문할 날짜는 1 이상 31 이하의 숫자로만 입력받아 주세요.
  - [x] 1 이상 31 이하의 숫자가 아닌 경우, "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - [x] 모든 에러 메시지는 "[ERROR]"로 시작하도록 작성해 주세요.
- [x] 주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)
  - [x] 고객이 메뉴판에 없는 메뉴를 입력하는 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - [x] 메뉴의 개수는 1 이상의 숫자만 입력되도록 해주세요. 이외의 입력값은 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - [x] 메뉴 형식이 예시와 다른 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - [x] 중복 메뉴를 입력한 경우(e.g. 시저샐러드-1,시저샐러드-1), "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 주세요.
  - [x] 모든 에러 메시지는 "[ERROR]"로 시작하도록 작성해 주세요.
- [x] 주문 메뉴의 출력 순서는 자유롭게 출력해 주세요.
- [x] 총혜택 금액에 따라 이벤트 배지의 이름을 다르게 보여 주세요.
- [x] 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격
- [x] 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
- [x] 증정 메뉴
  - [x] 증정 이벤트에 해당하지 않는 경우, 증정 메뉴 "없음"으로 보여 주세요.
- [x] 혜택 내역
  - [x] 고객에게 적용된 이벤트 내역만 보여 주세요.
  - [x] 적용된 이벤트가 하나도 없다면 혜택 내역 "없음"으로 보여 주세요.
  - [x] 혜택 내역에 여러 개의 이벤트가 적용된 경우, 출력 순서는 자유롭게 출력해주세요.
- [x] 이벤트 배지
  - [x] 이벤트 배지가 부여되지 않는 경우, "없음"으로 보여 주세요.

# ✅ 최종 체크포인트

- [x] `ApplicationTest`를 통과하는가?
- [x] 모든 단위 테스트가 통과하는가?
- [x] 뎁스가 과도하게 깊은 메서드는 존재하지 않는가?
- [x] 컨벤션에 맞게 코드가 작성되었는가?
- [x] Node.js 18.17.1 버전에서 실행 가능한가?
- [x] `package.json`에 변경사항이 존재하지 않는가?
- [x] `process.exit()`를 호출하는 코드가 존재하지 않는가?
- [x] 컨트롤러에서 에러 핸들링이 이루어지는가?
