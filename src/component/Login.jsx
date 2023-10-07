import React, { useState } from 'react';
import { Box, Image, Text, Input, Flex, Button } from '@chakra-ui/react';
import logocathouse from '../assets/logo.png';
import emailicon from '../assets/email.png';
import key from '../assets/key.png';
import { Link, useNavigate } from 'react-router-dom';
import catpaw from '../assets/cat paw.png';
import Swal from 'sweetalert2';
import api from '../services/Authen';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const dataReq = {
      email: email,
      password: password,
      role: 'merchant',
    };

    const res = await api.postLogin(dataReq);

    if (res.data.status) {
      // Successful login, show SweetAlert2 popup
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You are now logged in as admin.',
        showConfirmButton: false, // ไม่แสดงปุ่ม OK ใน SweetAlert2
        timer: 1000,
      });
      nav('/Home/Dashboard');
      sessionStorage.setItem('merchantEmail', res.data.user.email);
    } else {
      // Invalid login, show an error message
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: res.data.message,
      });
    }
  };

  return (
    <Box bg="#F2D4BC" display="grid" placeItems="center" minHeight="100vh">
      <Box
        bg="white"
        color="white"
        w="400px"
        h="500px"
        borderRadius="15px"
        boxShadow="0px 4px 6px rgba(0, 1, 1, 0.4)"
      >
        <Box h="140px">
          <Image
            src={logocathouse}
            alt="Image 1"
            position="relative"
            right="-130px"
            bottom="-50px"
          />
        </Box>
        <Box h="70px">
          <Text
            color="black"
            position="relative"
            right="-140px"
            fontWeight="bold"
            bottom="-30px"
          >
            {' '}
            ADMIN LOGIN{' '}
          </Text>
          <Text color="black" position="relative" right="-160px" bottom="-30px">
            {' '}
            CatHouse{' '}
          </Text>
        </Box>
        <Box h="110px">
          <Flex position="relative" bottom="-35px">
            <Image
              src={emailicon}
              alt="Image 2"
              position="relative"
              right="-30px"
              bottom="-10px"
              w="20px"
              h="20px"
            />
            <Input
              type="email" // กำหนดประเภทของ Input เป็น "email"
              placeholder="กรอกอีเมลของคุณ" // ข้อความ placeholder
              size="md" // ขนาดของ Input (xs, sm, md, lg)
              color="black"
              w="300px"
              position="relative"
              right="-50px"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
          <Flex position="relative" bottom="-35px">
            <Image
              src={key}
              alt="Image 3"
              position="relative"
              right="-30px"
              bottom="-20px"
              w="20px"
              h="20px"
            />
            <Input
              type="password" // กำหนดประเภทของ Input เป็น "email"
              placeholder="กรอกรหัสผ่านของคุณ" // ข้อความ placeholder
              size="md" // ขนาดของ Input (xs, sm, md, lg)
              color="black"
              w="300px"
              position="relative"
              right="-50px"
              bottom="-10px"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
        </Box>
        {/* <Link to="/Home/Dashboard"> */}
        <Button
          colorScheme="blue" // เลือกสีของปุ่ม (ในที่นี้ใช้สีน้ำเงิน)
          size="md" // ขนาดของปุ่ม (xs, sm, md, lg)
          w="300px"
          borderRadius="50px"
          position="relative"
          bottom="-30px"
          right="-70px"
          bg="#6184CF"
          _hover={{ color: 'white', backgroundColor: '#6184CF' }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        {/* </Link> */}
      </Box>
    </Box>
  );
};
export default Login;
