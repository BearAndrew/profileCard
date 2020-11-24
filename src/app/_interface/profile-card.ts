export interface ProfileCard {
  // cardOrder: number;
  // photo: img;
  // cardColor: string;
  name:  string;
  age: number;
  gender: string;
  location: string; // 地點
  constellation: string; // 星座
  job: string;
  department: string; // 科系
  noteList: Array<
  {
    keywords: Array<Ikeyword>,
    content: string;
  }>;
  // chekcList: {
  // };
}


interface Ikeyword {
  name: string | null;
  class: string | null;
}

export class ProfileCard implements ProfileCard {
  name = '';
  age = 0;
  gender = '';
  location = ''; // 地點
  constellation = ''; // 星座
  job = '';
  department = ''; // 科系
  noteList = [
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
  ];
}

export const noteListName = [
  '筆記', '親情', '友情', '愛情', '工作'
];
// '筆記', '親情', '友情', '愛情', '工作'
