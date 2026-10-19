let bookings = [
  { bookingCode: "CIN-001", customerName: "Nguyễn Văn An", movieTitle: "Ánh Trăng Cuối Phố", ticketCount: 2, pricePerTicket: 90000, totalAmount: 194400 },
  { bookingCode: "CIN-002", customerName: "Trần Thị Bình", movieTitle: "Biệt Đội Sao Băng", ticketCount: 4, pricePerTicket: 90000, totalAmount: 349920 },
  { bookingCode: "CIN-003", customerName: "Lê Minh Châu", movieTitle: "Mùa Hè Rực Lửa", ticketCount: 6, pricePerTicket: 110000, totalAmount: 641520 }
];

const findBookingIndex = (code) => {
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === code) {
      return i;
    }
  }
  return -1;
};

const validateBookingCode = (code) => {
  if (code === "") {
    return "Chưa nhập mã đặt vé";
  }
  if (code.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (code.slice(0, 4) !== "CIN-") {
    return "Sai tiền tố CIN-";
  }
  if (code.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findBookingIndex(code) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }
  return "";
};

const inputPositiveInteger = (message) => {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }

    input = input.trim();
    let number = Number(input);

    if (input === "" || isNaN(number) || number <= 0 || number % 1 !== 0) {
      console.log("Vui lòng nhập số nguyên lớn hơn 0");
    } else {
      return number;
    }
  }
};

const calculateTotal = (ticketCount, pricePerTicket) => {
  let baseCost = ticketCount * pricePerTicket;
  let discount = 0;

  if (ticketCount >= 4) {
    discount = Math.round(baseCost * 0.1);
  }

  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  return {
    baseCost: baseCost,
    discount: discount,
    serviceFee: serviceFee,
    totalAmount: totalAmount
  };
};

const inputName = (message) => {
  while (true) {
    let name = prompt(message);

    if (name === null) {
      return null;
    }

    name = name.trim().toLowerCase();

    if (name === "") {
      console.log("Không được để trống");
    } else {
      let words = name.split(" ");
      let result = "";

      for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
          let word = words[i][0].toUpperCase() + words[i].slice(1);
          if (result === "") {
            result = word;
          } else {
            result = result + " " + word;
          }
        }
      }
      return result;
    }
  }
};

const displayBookings = (list) => {
  if (list.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let revenue = 0;

  for (let i = 0; i < list.length; i++) {
    console.log((i + 1) + ". " + list[i].bookingCode + " - " + list[i].customerName + " - " + list[i].movieTitle);
    console.log("SL: " + list[i].ticketCount + " | Giá: " + list[i].pricePerTicket + " | Tổng TT: " + list[i].totalAmount);
    revenue = revenue + list[i].totalAmount;
  }

  console.log("Tổng: " + list.length + " đơn đặt vé - Doanh thu: " + revenue);
};

const handleCreateBooking = () => {
  let code = prompt("Nhập mã đặt vé:");

  if (code === null) {
    return;
  }

  code = code.trim().toUpperCase();
  let error = validateBookingCode(code);

  if (error !== "") {
    console.log(error);
    return;
  }

  let customerName = inputName("Nhập tên khách hàng:");
  if (customerName === null) {
    return;
  }

  let movieTitle = inputName("Nhập tên phim:");
  if (movieTitle === null) {
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số vé:");
  if (ticketCount === null) {
    return;
  }

  let pricePerTicket = inputPositiveInteger("Nhập giá vé:");
  if (pricePerTicket === null) {
    return;
  }

  let payment = calculateTotal(ticketCount, pricePerTicket);

  let newBooking = {
    bookingCode: code,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: payment.totalAmount
  };

  bookings.push(newBooking);

  console.log("Thêm đơn thành công");
  console.log("===== HÓA ĐƠN =====");
  console.log("Mã: " + code);
  console.log("Khách hàng: " + customerName);
  console.log("Phim: " + movieTitle);
  console.log("Số vé: " + ticketCount);
  console.log("Giá vé: " + pricePerTicket);
  console.log("Chi phí cơ sở: " + payment.baseCost);
  console.log("Giảm giá: " + payment.discount);
  console.log("Phí dịch vụ: " + payment.serviceFee);
  console.log("Tổng thanh toán: " + payment.totalAmount);
};

const handleUpdateBooking = () => {
  let code = prompt("Nhập mã cần cập nhật:");

  if (code === null) {
    return;
  }

  code = code.trim().toUpperCase();
  let index = findBookingIndex(code);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + code);
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số vé mới:");
  if (ticketCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let pricePerTicket = inputPositiveInteger("Nhập giá mới:");
  if (pricePerTicket === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let oldTotal = bookings[index].totalAmount;
  let payment = calculateTotal(ticketCount, pricePerTicket);

  bookings[index].ticketCount = ticketCount;
  bookings[index].pricePerTicket = pricePerTicket;
  bookings[index].totalAmount = payment.totalAmount;

  console.log("Cập nhật thành công");
  console.log("Tổng cũ: " + oldTotal);
  console.log("Tổng mới: " + payment.totalAmount);
};

const handleDeleteBooking = () => {
  let code = prompt("Nhập mã cần xóa:");

  if (code === null) {
    return;
  }

  code = code.trim().toUpperCase();
  let index = findBookingIndex(code);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + code);
    return;
  }

  let confirmDelete = prompt("Xác nhận xóa (Y/N):");

  if (confirmDelete === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  if (confirmDelete.trim().toUpperCase() === "Y") {
    bookings.splice(index, 1);
    console.log("Xóa thành công, còn " + bookings.length + " đơn");
  } else {
    console.log("Đã hủy thao tác xóa");
  }
};

const handleSearchBooking = () => {
  let keyword = prompt("Nhập tên phim:");

  if (keyword === null) {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  keyword = keyword.trim().toLowerCase();

  if (keyword === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  let results = [];

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].movieTitle.toLowerCase().includes(keyword)) {
      results.push(bookings[i]);
    }
  }

  if (results.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
  } else {
    displayBookings(results);
  }
};

const runCinemaSystem = () => {
  let choice = "";

  do {
    choice = prompt(`
===== MOONLIGHT CINEMA =====
1. Hiển thị danh sách
2. Thêm đơn đặt vé
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm theo tên phim
0. Thoát
Nhập lựa chọn:
    `);

    if (choice === null) {
      console.log("Lựa chọn không hợp lệ");
      choice = "";
    } else {
      choice = choice.trim();

      switch (choice) {
        case "1":
          displayBookings(bookings);
          break;

        case "2":
          handleCreateBooking();
          break;

        case "3":
          handleUpdateBooking();
          break;

        case "4":
          handleDeleteBooking();
          break;

        case "5":
          handleSearchBooking();
          break;

        case "0":
          console.log("Cảm ơn bạn đã sử dụng chương trình");
          break;

        default:
          console.log("Lựa chọn không hợp lệ");
          break;
      }
    }
  } while (choice !== "0");
};

runCinemaSystem();
