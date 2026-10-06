// 1. IMPORT ẢNH VÀO ĐÂY 
import imgBook1 from '../image/book1.jpg'; 
import imgBook2 from '../image/book2.jpg'; 
import imgBook3 from '../image/book3.jpg'; 
import imgBook4 from '../image/book4.jpg'; 
import imgBook5 from '../image/book5.jpg';
import imgBook6 from '../image/book6.jpg';

// 2. XUẤT DỮ LIỆU ĐỂ CÁC TRANG DÙNG CHUNG
export const booksData = [
  { 
    id: 1, 
    title: 'Fate/stay night', 
    author: 'Kinoko Nasu', 
    price: '350.000đ', 
    originalPrice: '500.000đ',
    description: 'Câu chuyện xoay quanh Cuộc chiến Chén Thánh, nơi các pháp sư triệu hồi Anh linh để chiến đấu. Sự lựa chọn của bạn sẽ dẫn đến 3 tuyến cốt truyện hoàn toàn khác biệt mang đậm tính sử thi và kỳ ảo.',
    publisher: 'Type-Moon',
    pages: 60,
    img: imgBook1 
  },
  { 
    id: 2, 
    title: 'Steins;Gate', 
    author: 'Chiyomaru Shikura', 
    price: '250.000đ',
    description: 'Một nhóm bạn trẻ tình cờ phát minh ra cỗ máy thời gian từ chiếc lò vi sóng. Nhưng việc thay đổi quá khứ dẫn đến hiệu ứng cánh bướm và những hậu quả kinh hoàng khôn lường...',
    publisher: 'Nitroplus',
    pages: 40,
    img: imgBook2 
  },
  { 
    id: 3, 
    title: 'Clannad', 
    author: 'Jun Maeda', 
    price: '400.000đ',
    description: 'Tuyệt tác Visual Novel về tình cảm gia đình, tình yêu và tuổi trẻ. Hành trình tìm lại ý nghĩa cuộc sống của Okazaki Tomoya chắc chắn sẽ lấy đi của bạn rất nhiều nước mắt.',
    publisher: 'Key / Visual Arts',
    pages: 80,
    img: imgBook3 
  },
  { 
    id: 4, 
    title: 'Doki Doki Literature Club Plus!', 
    author: 'Dan Salvato', 
    price: '120.000đ',
    description: 'Tưởng chừng là một tựa game hẹn hò học đường màu hồng trong sáng, nhưng ẩn sâu bên trong câu lạc bộ văn học này là những bí mật tâm lý học kinh dị tột độ ám ảnh tâm trí người chơi.',
    publisher: 'Team Salvato',
    pages: 10,
    img: imgBook4 
  },
 {
  id: 5,
  title: "The House in Fata Morgana",
  author: "Keika Hanada",
  price: "200.000đ",
  description: 'Một câu chuyện bi kịch Gothic vượt thời gian. Tỉnh dậy trong một căn biệt thự bị nguyền rủa mà không có ký ức, bạn phải đi qua nhiều thế kỷ để tìm lại chính bản thân mình.',
  publisher: 'Novectacle',
  pages: 35,
  img: imgBook5
 },
 {
  id: 6,
  title: "Cyberpunk Edgerunners: The Visual Novel",
  author: "CD Projekt RED",
  price: "300.000đ",
  description: 'Trải nghiệm thế giới Cyberpunk đầy màu sắc và kịch tính qua câu chuyện của những người sống sót trong xã hội dystopian.',
  publisher: 'CD Projekt RED',
  pages: 50,
  img: imgBook6
 }
];