import React, { useState, useRef, useEffect } from 'react';
import {
  Textarea,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  Input,
  InputGroup,
  Image,
  Box,
} from '@chakra-ui/react';
import logocathouse from '../assets/logo.png';
import catpaw from '../assets/cat paw.png';
import box from '../assets/box.png';
import tracking from '../assets/tracking.png';
import historical from '../assets/historical.png';
import view from '../assets/view.png';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from '@chakra-ui/react';
import api from '../services/BoMerchant';
import { Logout } from '../services/Logout';

const ViewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Box>
      <Button
        onClick={onOpen}
        w="40px"
        h="35px"
        position="relative"
        bottom="-2px"
        border="2px solid #564DE6"
        borderRadius="8px"
        bg="white"
        p={0}
        _hover={{ boxShadow: '0 5px 10px rgba(0, 0, 0, .1)' }}
      >
        <Image src={view} alt="Image 2" w="25px" h="25px" />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={handleOverlayClick}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent
          ref={modalRef}
          maxW="980px"
          w="100%"
          maxH="620px"
          h="100%"
        >
          <ModalHeader fontFamily={'Kanit, sans-serif'}>
            <Text position="relative" fontSize="28">
              การจัดส่งสินค้า
            </Text>
            <Box
              w="930px"
              h="40px"
              borderBottom="1px solid black"
              borderTop="1px solid black"
              position="relative"
            >
              <Flex position="relative" bottom="-5px" fontSize="16px">
                <Text position="relative" right="-120px">
                  ยี่ห้อ/ชื่อสินค้า
                </Text>
                <Text position="relative" right="-300px">
                  ราคา
                </Text>
                <Text position="relative" right="-400px">
                  จำนวน
                </Text>
                <Text position="relative" right="-510px">
                  ส่วนลด
                </Text>
                <Text position="relative" right="-627px">
                  รวม
                </Text>
              </Flex>
            </Box>

            {/* product 1 */}
            <Box h="70px" borderBottom="2px solid #E7EEF3" fontSize="16px">
              <Box h="25px" w="350px">
                <Text position="relative" right="-18px" bottom="-8px">
                  GIANT KINGKONG PRO
                </Text>
              </Box>

              <Flex display="flex" position="relative">
                <Box h="40px" w="410px">
                  <Text position="relative" right="-18px" bottom="-8px">
                    ค้อนปอนด์ด้ามไฟเบอร์ รุ่น HA 3009
                  </Text>
                </Box>
                <Box h="40px" w="120px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    3,590
                  </Text>
                </Box>
                <Box h="40px" w="180px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    1
                  </Text>
                </Box>
                <Box h="40px" w="180px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    0
                  </Text>
                </Box>
                <Box h="40px" w="180px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    3,590
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* product 2 */}
            <Box h="70px" borderBottom="2px solid #E7EEF3" fontSize="16px">
              <Box h="25px" w="350px">
                <Text position="relative" right="-18px" bottom="-8px">
                  KINGKONG PRO
                </Text>
              </Box>

              <Flex display="flex" position="relative">
                <Box h="40px" w="410px">
                  <Text position="relative" right="-18px" bottom="-8px">
                    ค้อนปอนด์ด้ามไฟเบอร์ รุ่น HA 2001
                  </Text>
                </Box>
                <Box h="40px" w="120px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    590
                  </Text>
                </Box>
                <Box h="40px" w="180px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    1
                  </Text>
                </Box>
                <Box h="40px" w="180px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    0
                  </Text>
                </Box>
                <Box h="40px" w="180px" display="flex" justifyContent="center">
                  <Text position="relative" bottom="-8px">
                    590
                  </Text>
                </Box>
              </Flex>
            </Box>
          </ModalHeader>
          <ModalBody fontFamily={'Kanit, sans-serif'}></ModalBody>
          <ModalFooter fontFamily={'Kanit, sans-serif'}></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const PurchaseOrder = () => {
  const [orderList, setOrderList] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const merchantEmail = sessionStorage.getItem('merchantEmail');

    const dataReq = {
      merchantEmail,
    };

    api.getMerchantOrders(dataReq).then((res) => {
      if (res.data.status) {
        setOrderList(res.data.orderList);
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
              <Text position="relative" bottom="-20px" right="-70px">
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
                <Text
                  position="relative"
                  right="-10px"
                  bottom="-10px"
                  fontWeight="bold"
                >
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
              bottom="-30px"
            >
              Purchase Order
            </Text>
          </Box>
          <Box
            w="1570px"
            h="770px"
            bg="#FFFFFF"
            border="2px dashed #EAEAEA"
            borderRadius="2%"
            position="relative"
            bottom="-50px"
          >
            <Box
              w="1500px"
              h="40px"
              bg="#E8F5FE"
              borderBottom="4px solid #E7EEF3"
              borderTop="4px solid #E7EEF3"
              position="relative"
              right="-32px"
              bottom="-20px"
            >
              <Flex>
                <Text position="relative" right="-20px" bottom="-5px">
                  ลำดับ
                </Text>
                <Text position="relative" right="-110px" bottom="-5px">
                  ชื่อ นามสกุล
                </Text>
                <Text position="relative" right="-250px" bottom="-5px">
                  เบอร์โทร
                </Text>
                <Text position="relative" right="-380px" bottom="-5px">
                  การจัดส่งสินค้า
                </Text>
                <Text position="relative" right="-470px" bottom="-5px">
                  การชำระเงิน
                </Text>
                <Text position="relative" right="-550px" bottom="-5px">
                  รวมการสั่งซื้อ(ราคา)
                </Text>
                <Text position="relative" right="-625px" bottom="-5px">
                  ดูข้อมูล
                </Text>
              </Flex>
            </Box>

            {/* สินค้าตามลำดับ  */}
            <Box
              w="1500px"
              h="672px"
              bg="white"
              overflow="scroll"
              position="relative"
              right="-32px"
              bottom="-20px"
            >
              {orderList.map((order, index) => (
                <Box key={index + 1} h="40px" borderBottom="2px solid #E7EEF3">
                  <Flex display="flex" position="relative">
                    <Box
                      h="40px"
                      w="80px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text position="relative" bottom="-8px">
                        {index + 1}
                      </Text>
                    </Box>
                    <Box h="40px" w="250px">
                      <Text position="relative" right="-18px" bottom="-8px">
                        {order.transactionDetail.address.firstName +
                          ' ' +
                          order.transactionDetail.address.lastName}
                      </Text>
                    </Box>
                    <Box h="40px" w="180px">
                      <Text position="relative" right="-18px" bottom="-8px">
                        {order.transactionDetail.address.telNo}
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="180px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text position="relative" bottom="-8px">
                        จัดส่งโดยรถบรรทุก
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="180px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text position="relative" bottom="-8px">
                        ชำระผ่านบัตรเครดิต
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="180px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text position="relative" bottom="-8px">
                        {order.transactionDetail.totalAmount}
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="150px"
                      display="flex"
                      justifyContent="center"
                      position="relative"
                    >
                      <ViewButton />
                    </Box>
                    <Box
                      h="40px"
                      w="150px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Checkbox colorScheme="green">แพ็คแล้ว</Checkbox>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default PurchaseOrder;
