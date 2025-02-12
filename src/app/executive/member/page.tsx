export default function AdminMemberPage() {
  return (
    <main className="px-4 pt-24">
      <h2 className="text-4xl font-bold">관리자 페이지 : 회원 관리</h2>
    </main>
  );
}

// 'use client'
// import { useFormState } from 'react-dom'
// import { signInWithCredentials } from '@/serverActions/auth'
// import SubmitButton from '@/components/SubmitButton'

// export default function SignUpPage() {
//   const [state, action] = useFormState(signInWithCredentials, {
//     message: ''
//   })
//   return (
//     <>
//       <h1>회원가입</h1>
//       <h2>{state.message}</h2>
//       <form
//         action={action}
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'start',
//           gap: '10px'
//         }}>
//         <label>
//           사용자 이름
//           <input
//             name="displayName"
//             type="text"
//           />
//         </label>
//         <label>
//           이메일(ID)
//           <input
//             name="email"
//             type="email"
//           />
//         </label>
//         <label>
//           비밀번호
//           <input
//             name="password"
//             type="password"
//           />
//         </label>
//         <SubmitButton name="회원가입" />
//       </form>
//     </>
//   )
// }
