interface User {
  email: string;
  password: string;
}

const mockUsers: User[] = [
  { email: 'test1@g.kmou.ac.kr', password: 'Password1!' },
  { email: 'test2@g.kmou.ac.kr', password: 'SecurePass2@' },
  { email: 'test3@g.kmou.ac.kr', password: 'StrongPass3#' },
];

export default mockUsers;
