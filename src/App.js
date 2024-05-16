import logo from './logo.svg';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

const GET_USERS = gql`
query {
  users {
    _id
    name
    email
  }
  posts{
    id
    title
  }
}
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      name
      email
    }
  }
`;

function App() {
  const [addUser] = useMutation(ADD_USER)
  const [formData, setFormData] = useState({
    name: "",
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((previousValue) => ({
      ...previousValue,
      [name]: value
    })

    )
  }

  const hanldeSubmit = async () => {
    try {
      const { name, email } = formData
      await addUser({ variables: { name, email } })
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error('Error adding user:', error);

    }

  }
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USERS);
  if (userLoading) return "Loading...";
  if (userError) return <pre>{userError.message}</pre>;
  console.log(userData?.users)
  return (
    <>{userData?.users?.map((user) => (
      <div key={user._id} style={{ display: "flex", gap: "20px" }}>
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>
    ))}
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button className='' onClick={hanldeSubmit}>Add</button>
    </>
  );
}

export default App;
