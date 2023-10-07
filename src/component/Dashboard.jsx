import React, { useEffect, useState, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import {
  Tab,
  FormControl,
  Textarea,
  FormErrorMessage,
  FormHelperText,
  useColorModeValue,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  TabIndicator,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Box,
} from '@chakra-ui/react';
import logocathouse from '../assets/logo.png';
import emailicon from '../assets/email.png';
import key from '../assets/key.png';
import catpaw from '../assets/cat paw.png';
import box from '../assets/box.png';
import tracking from '../assets/tracking.png';
import historical from '../assets/historical.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/BoMerchant';
import { Logout } from '../services/Logout';

const Login = () => {
  const [monthProfit, setMonthProfit] = useState(null);
  const [monthOrder, setMonthOrder] = useState(null);
  const [monthCustomer, setMonthCustomer] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const merchantEmail = sessionStorage.getItem('merchantEmail');

    const dataReq = {
      merchantEmail: merchantEmail,
    };

    api.getDashBoardStats(dataReq).then((res) => {
      if (res.data.status) {
        setMonthProfit(res.data.monthlyProfitResp.totalProfit);
        setMonthOrder(res.data.monthlyProfitResp.totalOrder);
        setMonthCustomer(res.data.monthlyCustomerResp.totalCustomer);
      }
    });
  }, []);

  const handleLogout = () => {
    Logout();
    nav('/');
  };

  return (
    <Box bg="#F8F8F8" w="1920px" h="923px" fontFamily={'Kanit, sans-serif'}>
      <Flex>
        <Box
          minHeight="100vh"
          w="250px"
          bg="#FFFFFF"
          boxShadow="0px 0px 4px rgba(0, 0, 0, 0.2)"
        >
          <Box h="65px" w="250px">
            <Flex>
              <Image
                src={logocathouse}
                alt="Image 1"
                w="100px"
                h="60px"
                position="relative"
                right="-20px"
                bottom="-8px"
              />
              <Text
                fontWeight="bold"
                position="relative"
                right="-30px"
                bottom="-22px"
              >
                CatHouse
              </Text>
            </Flex>
          </Box>

          <Box minWidth="10vh" h="20px" borderBottom="2px solid #F3F3F3" />

          <Box minWidth="10vh" h="50px" position="relative">
            <Link to="/Home/Dashboard">
              <Text
                position="relative"
                bottom="-20px"
                right="-70px"
                fontWeight="bold"
              >
                Dashboard
              </Text>
            </Link>
          </Box>

          <Box minWidth="10vh" h="50px" position="relative">
            <Link to="/Home/ProductManagement">
              <Flex position="relative" bottom="-10px" right="-20px">
                <Image src={box} alt="Image 2" w="30px" h="30px" />
                <Text position="relative" right="-10px">
                  Product Management
                </Text>
              </Flex>
            </Link>
          </Box>

          <Box minWidth="10vh" h="50px" position="relative">
            <Link to="/Home/PurchaseOrder">
              <Flex position="relative" bottom="-5px" right="-20px">
                <Image src={tracking} alt="Image 3" w="40px" h="40px" />
                <Text position="relative" right="-10px" bottom="-10px">
                  Purchase Order
                </Text>
              </Flex>
            </Link>
          </Box>

          <Box minWidth="10vh" h="50px" position="relative">
            <Link to="/Home/WarehouseHistory">
              <Flex position="relative" bottom="-5px" right="-20px">
                <Image src={historical} alt="Image 4" w="35px" h="35px" />
                <Text position="relative" right="-10px" bottom="-10px">
                  Warehouse History
                </Text>
              </Flex>
            </Link>
          </Box>

          <Box
            minWidth="10vh"
            h="110px"
            borderTop="2px solid #F3F3F3"
            position="relative"
            bottom="-528px"
          >
            <Flex>
              <Box
                w="50px"
                h="50px"
                border="2px solid black"
                position="relative"
                bottom="-15px"
                right="-10px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
              >
                <Image
                  src={catpaw}
                  alt="Image 5"
                  w="35px"
                  h="35px"
                  position="relative"
                  bottom="-5px"
                />
              </Box>
              <Text
                position="relative"
                fontWeight="bold"
                right="-20px"
                bottom="-15px"
              >
                Admin
              </Text>
              <Text position="relative" left="-30px" bottom="-40px">
                Admin
              </Text>
              <Box
                bg="#67D32C"
                w="15px"
                h="15px"
                position="relative"
                bottom="-50px"
                left="-105px"
                borderRadius="50%"
              ></Box>
            </Flex>

            <Box position="relative" bottom="-20px">
              <Button onClick={handleLogout} w="100%">
                <Text position="relative" bottom="-4px">
                  ออกจากระบบ
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box w="1620px" h="923px" position="relative" right="-50px">
          <Box h="60px">
            <Text
              fontWeight="bold"
              fontSize="30px"
              color="#444E5E"
              position="relative"
              bottom="-10px"
            >
              Dashboard
            </Text>
          </Box>
          <Flex>
            <Box>
              <Box
                w="300px"
                h="150px"
                bg="#FFFFFF"
                borderRadius="5%"
                position="relative"
                bottom="-10px"
              >
                <Text
                  fontWeight="bold"
                  position="relative"
                  bottom="-20px"
                  right="-20px"
                >
                  Today's Profit
                </Text>
                <Text
                  fontSize="14"
                  color="gray.400"
                  position="relative"
                  bottom="-20px"
                  right="-30px"
                >
                  {' '}
                  January – March
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="34px"
                  color="#564DE6"
                  display="grid"
                  justifyContent="center"
                  position="relative"
                  bottom="-30px"
                >
                  {monthProfit}
                </Text>
              </Box>

              <Flex>
                <Box
                  w="140px"
                  h="140px"
                  bg="#FFFFFF"
                  borderRadius="5%"
                  position="relative"
                  bottom="-30px"
                >
                  <Text
                    fontWeight="bold"
                    position="relative"
                    bottom="-20px"
                    right="-20px"
                  >
                    Customers
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="34px"
                    color="#564DE6"
                    display="grid"
                    justifyContent="center"
                    position="relative"
                    bottom="-30px"
                  >
                    {monthCustomer}
                  </Text>
                </Box>
                <Box
                  w="140px"
                  h="140px"
                  bg="#FFFFFF"
                  borderRadius="5%"
                  position="relative"
                  bottom="-30px"
                  right="-20px"
                >
                  <Text
                    fontWeight="bold"
                    position="relative"
                    bottom="-20px"
                    right="-20px"
                  >
                    Total Orders
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="34px"
                    color="#564DE6"
                    display="grid"
                    justifyContent="center"
                    position="relative"
                    bottom="-30px"
                  >
                    {monthOrder}
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Box
              w="600px"
              h="310px"
              bg="#FFFFFF"
              borderRadius="5%"
              position="relative"
              bottom="-10px"
              right="-20px"
            >
              <Text
                fontWeight="bold"
                position="relative"
                bottom="-20px"
                right="-20px"
              >
                Monthly Profit
              </Text>
              <Text
                fontSize="14"
                color="gray.400"
                position="relative"
                bottom="-20px"
                right="-30px"
              >
                {' '}
                January 01, 2023 – December 31, 2024
              </Text>
            </Box>
          </Flex>

          <Box h="60px">
            <Text
              fontWeight="bold"
              fontSize="30px"
              color="#444E5E"
              position="relative"
              bottom="-30px"
            >
              Product
            </Text>
          </Box>

          <Box
            w="160px"
            h="130px"
            bg="#FFFFFF"
            borderRadius="5%"
            position="relative"
            bottom="-30px"
          >
            <Text
              fontWeight="bold"
              position="relative"
              bottom="-20px"
              right="-20px"
            >
              Add Product
            </Text>
            <Link to="/Home/ProductManagement">
              <Button
                w="113px"
                h="40px"
                position="relative"
                bottom="-40px"
                right="-20px"
                borderRadius="8px"
                bg="#564DE6"
                border="none"
                p={0}
                _hover={{
                  bg: '#2C23BF',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, .1)',
                }}
              >
                <Text color="white" fontSize="14" position="relative">
                  Add Product
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default Login;
