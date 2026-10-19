let bookings = [
  {bookingCode: "CIN-001",customerName: "Nguyễn Văn An",movieTitle: "Ánh Trăng Cuối Phố",ticketCount: 2,pricePerTicket: 90000,totalAmount: 194400},
  {bookingCode: "CIN-002",customerName: "Trần Thị Bình",movieTitle: "Biệt Đội Sao Băng",ticketCount: 4,pricePerTicket: 90000,totalAmount: 349920},
  {bookingCode: "CIN-003",customerName: "Lê Minh Châu",movieTitle: "Mùa Hè Rực Lửa",ticketCount: 6,pricePerTicket: 110000,totalAmount: 641520}
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

  for (let i = 0; i < code.length; i++) {
    if (code[i] === " " ||code[i] === "\t" ||code[i] === "\n" ||code[i] === "\r") {
      return "Chứa khoảng trắng";
    }
  }

  if (findBookingIndex(code) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }

  return " ";
};

const inputPositiveInteger = (message) => {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    input = input.trim();
    let number = Number(input);

    if (input === "" ||isNaN(number) ||number <= 0 ||number % 1 !== 0 ||number === Infinity) {
      console.log("Vui lòng nhập số nguyên lớn hơn 0");
    } 
    else {
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

  return {baseCost: baseCost,discount: discount,serviceFee: serviceFee,totalAmount: totalAmount};
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
    } 
    else {
      let result = "";
      let upperNext = true;

      for (let i = 0; i < name.length; i++) {
        if (name[i] === " " ||name[i] === "\t" ||name[i] === "\n") {
          if (result !== "" && result[result.length - 1] !== " ") {
            result = result + " ";
          }
          upperNext = true;
        } else {
          if (upperNext === true) {
            result = result + name[i].toUpperCase();
            upperNext = false;
          } else {
            result = result + name[i];
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

  let totalRevenue = 0;

  for (let i = 0; i < list.length; i++) {
    console.log((i + 1) + ". " +list[i].bookingCode + " - " +list[i].customerName + " - " +list[i].movieTitle);
    console.log("SL: " + list[i].ticketCount +" | Giá: " + list[i].pricePerTicket + " | Tổng TT: " + list[i].totalAmount);
    totalRevenue = totalRevenue + list[i].totalAmount;
  }

  console.log("Tổng: " + list.length + " đơn đặt vé");
  console.log("Doanh thu: " + totalRevenue);
};

const handleCreateBooking = () => {
  let bookingCode = prompt("Nhập mã đặt vé:");
  if (bookingCode === null) {
    console.log("Đã hủy thêm đơn");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();
  let error = validateBookingCode(bookingCode);
  if (error !== "") {
    console.log(error);
    return;
  }

  let customerName = inputName("Nhập tên khách hàng:");
  if (customerName === null) {
    console.log("Đã hủy thêm đơn");
    return;
  }

  let movieTitle = inputName("Nhập tên phim:");
  if (movieTitle === null) {
    console.log("Đã hủy thêm đơn");
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số vé:");
  if (ticketCount === null) {
    console.log("Đã hủy thêm đơn");
    return;
  }

  let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé:");
  if (pricePerTicket === null) {
    console.log("Đã hủy thêm đơn");
    return;
  }

  let payment = calculateTotal(ticketCount, pricePerTicket);
  let newBooking = {
    bookingCode: bookingCode,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: payment.totalAmount
  };

  bookings.push(newBooking);
  console.log("Thêm đơn đặt vé thành công");
  console.log("========== HÓA ĐƠN ==========");
  console.log("Mã đặt vé: " + bookingCode);
  console.log("Khách hàng: " + customerName);
  console.log("Tên phim: " + movieTitle);
  console.log("Số vé: " + ticketCount);
  console.log("Giá mỗi vé: " + pricePerTicket);
  console.log("Chi phí cơ sở: " + payment.baseCost);
  console.log("Giảm giá: " + payment.discount);
  console.log("Phí dịch vụ: " + payment.serviceFee);
  console.log("Tổng thanh toán: " + payment.totalAmount);
};

const handleUpdateBooking = () => {
  let bookingCode = prompt("Nhập mã đặt vé cần cập nhật:");

  if (bookingCode === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();
  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + bookingCode);
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số vé mới:");
  if (ticketCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let pricePerTicket = inputPositiveInteger("Nhập giá vé mới:");
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
  console.log("Tổng thanh toán cũ: " + oldTotal);
  console.log("Tổng thanh toán mới: " + payment.totalAmount);
};

const handleDeleteBooking = () => {
  let bookingCode = prompt("Nhập mã đặt vé cần xóa:");
  if (bookingCode === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();
  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + bookingCode);
    return;
  }

  let confirmDelete = prompt("Bạn có muốn xóa? (Y/N)");
  if (confirmDelete === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  confirmDelete = confirmDelete.trim().toUpperCase();

  if (confirmDelete === "Y") {
    bookings.splice(index, 1);

    console.log("Xóa thành công");
    console.log("Số đơn còn lại: " + bookings.length);
  } else {
    console.log("Đã hủy thao tác xóa");
  }
};

const handleSearchBooking = () => {
  let keyword = prompt("Nhập tên phim cần tìm:");
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
    let movieName = bookings[i].movieTitle.toLowerCase();
    if (movieName.includes(keyword)) {
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
  let choice = -1;
  do {
    let input = prompt(`
========================================
   HỆ THỐNG QUẢN LÝ MOONLIGHT CINEMA
========================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
========================================
Nhập lựa chọn (0 - 5):
    `);

    if (input === null) {
      console.log("Lựa chọn không hợp lệ");
      choice = -1;
    } else {
      input = input.trim();

      if (input === "") {
        console.log("Lựa chọn không hợp lệ");
        choice = -1;
      } else {
        choice = Number(input);

        if (isNaN(choice) ||choice % 1 !== 0 ||choice < 0 ||choice > 5) {
          console.log("Lựa chọn không hợp lệ");
          choice = -1;
        } else {
          switch (choice) {
            case 1: {
              displayBookings(bookings);
              break;
            }
            case 2: {
              handleCreateBooking();
              break;
            }
            case 3: {
              handleUpdateBooking();
              break;
            }
            case 4: {
              handleDeleteBooking();
              break;
            }
            case 5: {
              handleSearchBooking();
              break;
            }
            case 0: {
              console.log("Cảm ơn bạn đã sử dụng chương trình");
              break;
            }
            default: {
              console.log("Lựa chọn không hợp lệ");
              break;
            }
          }
        }
      }
    }
  }while (choice !== 0);
};
runCinemaSystem();
