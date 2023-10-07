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
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import api from '../services/BoMerchant';
import * as XLSX from 'xlsx';
import { Logout } from '../services/Logout';

const AddProduct = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const [brandName, setBrandName] = useState(null);
  const [productName, setProductName] = useState(null);
  const [netCost, setNetCost] = useState(0);
  const [price, setPrice] = useState(0);

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

  const validateFields = () => {
    if (!brandName) {
      alert('Please fill brandName');
      return false;
    }

    if (!productName) {
      alert('');
      return false;
    }

    // if (!netCost) {
    //   alert('Please fill netCost');
    //   return false;
    // }

    if (!price) {
      alert('Please fill price');
      return false;
    }

    return true;
  };

  const addingNewProduct = () => {
    const email = sessionStorage.getItem('merchantEmail');

    if (!validateFields()) {
      return;
    }

    const dataReq = {
      email,
      productList: [
        {
          brandName,
          productName,
          netCost,
          price,
        },
      ],
    };

    console.log(dataReq);

    api.addOneNewProduct(dataReq).then((res) => {
      if (res.data.status) {
        alert(res.data.message);
        props.updateProductInStore(res.data.productList);
        onClose();
        return;
      } else {
        alert(res.data.message);
        return;
      }
    });
  };

  return (
    <Box>
      <Button
        onClick={onOpen}
        w="130px"
        h="40px"
        right="-12px"
        position="relative"
        bottom="-10px"
        borderRadius="50px"
        bg="#564DE6"
        border="none"
        p={0}
        _hover={{ bg: '#2C23BF', boxShadow: '0 5px 10px rgba(0, 0, 0, .1)' }}
      >
        <Text color="white" position="relative">
          Add Product
        </Text>
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
          <ModalHeader></ModalHeader>
          <ModalBody fontFamily={'Kanit, sans-serif'}>
            <Flex>
              <Box>
                <Box w="700px" h="45px" position="relative" top="-10px">
                  <Box
                    fontWeight="bold"
                    fontSize="18"
                    position="relative"
                    right="-10px"
                    top="-8px"
                  >
                    เพิ่มสินค้า
                  </Box>
                  <Box
                    fontSize="14"
                    position="relative"
                    right="-40px"
                    top="-10px"
                  >
                    เพิ่มสินค้าลงคลัง
                  </Box>
                </Box>
                <Box w="700px" h="500px" position="relative">
                  <Box>
                    <Flex h="100%">
                      <Box>
                        <InputGroup position="relative" right="-30px">
                          <Input
                            htmlSize={32}
                            width="200px"
                            placeholder="ยี่ห้อ"
                            focusBorderColor="#0F63E9"
                            _hover={{ borderColor: '#0F63E9' }}
                            onChange={(e) => setBrandName(e.target.value)}
                          />
                        </InputGroup>
                        <InputGroup
                          position="relative"
                          bottom="-10px"
                          right="-30px"
                        >
                          <Input
                            htmlSize={32}
                            width="200px"
                            placeholder="ชื่อสินค้า"
                            focusBorderColor="#0F63E9"
                            _hover={{ borderColor: '#0F63E9' }}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </InputGroup>
                        <InputGroup
                          position="relative"
                          bottom="-20px"
                          right="-30px"
                        >
                          <Input
                            htmlSize={32}
                            width="200px"
                            placeholder="ราคา"
                            focusBorderColor="#0F63E9"
                            _hover={{ borderColor: '#0F63E9' }}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                          />
                        </InputGroup>
                      </Box>
                      <Textarea
                        placeholder="คุณสมบัติโดยรวม"
                        w="420px"
                        h="140px"
                        resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                        rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                        position="relative"
                        right="-50px"
                      />
                    </Flex>
                    <Box position="relative" bottom="-15px" right="-10px">
                      <Text>รายละเอียดสินค้า</Text>
                    </Box>

                    <Flex position="relative" right="-30px">
                      <Box position="relative" bottom="-20px">
                        <Textarea
                          placeholder="รายละเอียดสินค้า"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>

                      <Box position="relative" bottom="-20px" right="-20px">
                        <Textarea
                          placeholder="รายละเอียดคุณสมบัติ"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>

                      <Box position="relative" bottom="-20px" right="-40px">
                        <Textarea
                          placeholder="รายละเอียดวิธีใช้งาน"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>
                    </Flex>
                    <Flex position="relative" right="-30px" bottom="-20px">
                      <Box position="relative" bottom="-20px">
                        <Textarea
                          placeholder="รายละเอียดคำแนะนำ"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>

                      <Box position="relative" bottom="-20px" right="-20px">
                        <Textarea
                          placeholder="รายละเอียดข้อควรระวัง"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>

              <Box w="300px" h="500px">
                <Box position="relative" bottom="-10px">
                  <Text>ข้อมูลจำเพาะ</Text>
                </Box>
                <Box position="relative" bottom="-20px">
                  <Input
                    htmlSize={32}
                    position="relative"
                    right="-20px"
                    width="200px"
                    placeholder="แบรนด์"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    htmlSize={32}
                    position="relative"
                    bottom="-10px"
                    right="-20px"
                    width="200px"
                    placeholder="วัสดุหลัก"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    htmlSize={32}
                    position="relative"
                    bottom="-20px"
                    right="-20px"
                    width="200px"
                    placeholder="ความสูง (ซม.)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    htmlSize={32}
                    position="relative"
                    bottom="-30px"
                    right="-20px"
                    width="200px"
                    placeholder="ความกว้าง (ซม.)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    htmlSize={32}
                    position="relative"
                    bottom="-40px"
                    right="-20px"
                    width="200px"
                    placeholder="ความลึก (ซม.)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    htmlSize={32}
                    position="relative"
                    bottom="-50px"
                    right="-20px"
                    width="200px"
                    placeholder="ขนาดสินค้า (นิ้ว)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter fontFamily={'Kanit, sans-serif'}>
            <Button
              onClick={onClose}
              w="184px"
              h="40px"
              borderRadius="8px"
              bg="white"
              border="none"
              p={0}
              style={{ borderRadius: '5px', border: '1px solid #0F63E9' }}
              _hover={{
                borderColor: 'white',
                boxShadow: '0 5px 10px rgba(0, 0, 0, .2)',
              }}
              position="relative"
              top="-70px"
            >
              <Text color="#0F63E9" fontSize="14">
                ยกเลิก
              </Text>
            </Button>
            <Box w="10px" h="10px" />
            <Button
              onClick={addingNewProduct}
              w="184px"
              h="40px"
              borderRadius="8px"
              bg="#564DE6"
              border="none"
              p={0}
              _hover={{
                bg: '#2C23BF',
                boxShadow: '0 5px 10px rgba(0, 0, 0, .2)',
              }}
              position="relative"
              top="-70px"
            >
              <Text color="white" fontSize="14">
                บันทึก
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

function ExcelFileUploader() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, {
          defval: null,
        });
        setData(excelData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="file-upload"
        // onChange={(e) => setData(e.target.files[0])}
      />
      <label htmlFor="file-upload">
        <Button
          as="label"
          htmlFor="file-upload"
          cursor="pointer"
          color="white"
          w="130px"
          h="40px"
          position="relative"
          bottom="-10px"
          right="-30px"
          borderRadius="50px"
          bg="#564DE6"
          border="none"
          p={0}
          _hover={{ bg: '#2C23BF', boxShadow: '0 5px 10px rgba(0, 0, 0, .1)' }}
        >
          Upload Excel
        </Button>
      </label>
      {data && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            ข้อมูลจากไฟล์ Excel:
          </Text>
          <pre>{file.name}</pre>
        </Box>
      )}
    </Box>
  );
}

const ViewAndEditButton = () => {
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
          <ModalHeader></ModalHeader>
          <ModalBody fontFamily={'Kanit, sans-serif'}>
            <Flex>
              <Box>
                <Box w="700px" h="45px" position="relative" top="-10px">
                  <Box
                    fontWeight="bold"
                    fontSize="18"
                    position="relative"
                    right="-10px"
                    top="-8px"
                  >
                    เพิ่มสินค้า
                  </Box>
                  <Box
                    fontSize="14"
                    position="relative"
                    right="-40px"
                    top="-10px"
                  >
                    เพิ่มสินค้าลงคลัง
                  </Box>
                </Box>
                <Box w="700px" h="500px" position="relative">
                  <Box>
                    <Flex h="100%">
                      <Box>
                        <InputGroup position="relative" right="-30px">
                          <Input
                            readOnly
                            htmlSize={32}
                            width="200px"
                            placeholder="ยี่ห้อ"
                            focusBorderColor="#0F63E9"
                            _hover={{ borderColor: '#0F63E9' }}
                          />
                        </InputGroup>
                        <InputGroup
                          position="relative"
                          bottom="-10px"
                          right="-30px"
                        >
                          <Input
                            readOnly
                            htmlSize={32}
                            width="200px"
                            placeholder="ชื่อสินค้า"
                            focusBorderColor="#0F63E9"
                            _hover={{ borderColor: '#0F63E9' }}
                          />
                        </InputGroup>
                        <InputGroup
                          position="relative"
                          bottom="-20px"
                          right="-30px"
                        >
                          <Input
                            readOnly
                            htmlSize={32}
                            width="200px"
                            placeholder="ราคา"
                            focusBorderColor="#0F63E9"
                            _hover={{ borderColor: '#0F63E9' }}
                          />
                        </InputGroup>
                      </Box>
                      <Textarea
                        readOnly
                        placeholder="คุณสมบัติโดยรวม"
                        w="420px"
                        h="140px"
                        resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                        rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                        position="relative"
                        right="-50px"
                      />
                    </Flex>
                    <Box position="relative" bottom="-15px" right="-10px">
                      <Text>รายละเอียดสินค้า</Text>
                    </Box>

                    <Flex position="relative" right="-30px">
                      <Box position="relative" bottom="-20px">
                        <Textarea
                          readOnly
                          placeholder="รายละเอียดสินค้า"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>

                      <Box position="relative" bottom="-20px" right="-20px">
                        <Textarea
                          readOnly
                          placeholder="รายละเอียดคุณสมบัติ"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>

                      <Box position="relative" bottom="-20px" right="-40px">
                        <Textarea
                          readOnly
                          placeholder="รายละเอียดวิธีใช้งาน"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>
                    </Flex>
                    <Flex position="relative" right="-30px" bottom="-20px">
                      <Box position="relative" bottom="-20px">
                        <Textarea
                          readOnly
                          placeholder="รายละเอียดคำแนะนำ"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>

                      <Box position="relative" bottom="-20px" right="-20px">
                        <Textarea
                          readOnly
                          placeholder="รายละเอียดข้อควรระวัง"
                          w="200px"
                          h="140px"
                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                          position="relative"
                          bottom="-10px"
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>

              <Box w="300px" h="500px">
                <Box position="relative" bottom="-10px">
                  <Text>ข้อมูลจำเพาะ</Text>
                </Box>
                <Box position="relative" bottom="-20px">
                  <Input
                    readOnly
                    htmlSize={32}
                    position="relative"
                    right="-20px"
                    width="200px"
                    placeholder="แบรนด์"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    readOnly
                    htmlSize={32}
                    position="relative"
                    bottom="-10px"
                    right="-20px"
                    width="200px"
                    placeholder="วัสดุหลัก"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    readOnly
                    htmlSize={32}
                    position="relative"
                    bottom="-20px"
                    right="-20px"
                    width="200px"
                    placeholder="ความสูง (ซม.)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    readOnly
                    htmlSize={32}
                    position="relative"
                    bottom="-30px"
                    right="-20px"
                    width="200px"
                    placeholder="ความกว้าง (ซม.)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    readOnly
                    htmlSize={32}
                    position="relative"
                    bottom="-40px"
                    right="-20px"
                    width="200px"
                    placeholder="ความลึก (ซม.)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                  <Input
                    readOnly
                    htmlSize={32}
                    position="relative"
                    bottom="-50px"
                    right="-20px"
                    width="200px"
                    placeholder="ขนาดสินค้า (นิ้ว)"
                    focusBorderColor="#0F63E9"
                    _hover={{ borderColor: '#0F63E9' }}
                  />
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter fontFamily={'Kanit, sans-serif'}>
            <Button
              onClick={onClose}
              w="184px"
              h="40px"
              borderRadius="8px"
              bg="white"
              border="none"
              p={0}
              style={{ borderRadius: '5px', border: '1px solid #0F63E9' }}
              _hover={{
                borderColor: 'white',
                boxShadow: '0 5px 10px rgba(0, 0, 0, .2)',
              }}
              position="relative"
              top="-70px"
            >
              <Text color="#0F63E9" fontSize="14">
                ยกเลิก
              </Text>
            </Button>
            <Box w="10px" h="10px" />
            <Button
              onClick={onOpen}
              w="184px"
              h="40px"
              borderRadius="8px"
              bg="#564DE6"
              border="none"
              p={0}
              _hover={{
                bg: '#2C23BF',
                boxShadow: '0 5px 10px rgba(0, 0, 0, .2)',
              }}
              position="relative"
              top="-70px"
            >
              <Text color="white" fontSize="14">
                บันทึก
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [productInStore, setProductInStore] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem('merchantEmail');

    const dataReq = {
      email,
    };

    api.getWareHouseHistory(dataReq).then((res) => {
      if (res.data.status) {
        setProductInStore(res.data.productList);
      }
    });
  }, []);

  const updateProductInStore = (productInStore) => {
    setProductInStore(productInStore);
  };

  const handleLogout = () => {
    Logout();
    nav('/');
  };

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

  // สร้างสถานะสำหรับรายการผลิตภัณฑ์
  const [products, setProducts] = useState([]);
  // สถานะสำหรับแก้ไขผลิตภัณฑ์
  const [editProduct, setEditProduct] = useState(null);
  // สถานะสำหรับ Modal เพิ่มผลิตภัณฑ์
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  // สถานะสำหรับ Modal ลบผลิตภัณฑ์
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  // สถานะสำหรับเก็บรายการผลิตภัณฑ์ที่จะลบ
  const [productToDelete, setProductToDelete] = useState(null);

  // สถานะสำหรับยี่ห้อ,ชื่อ,ราคา,คุณสมบัติ ของผลิตภัณฑ์ที่เพิ่มและแก้ไข
  const [productbrand, setProductbrand] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productfeature, setProductfeature] = useState('');
  //รายละเอียดสินค้า
  const [productdetails, setdetails] = useState('');
  const [productdetailsfeature, setProductdetproductdetailsfeature] =
    useState('');
  const [productdetailshowtouse, setProductdeproductdetailshowtouse] =
    useState(''); //รายละเอียดวิธีใช้งาน
  const [productdetailinstructions, setProductdetailinstructions] =
    useState(''); //รายละเอียดคำแนะนำ
  const [productdetailPrecaution, setProductdetailPrecaution] = useState('');
  //ข้อมูลจำเพาะ
  const [productmainmaterial, setProductmainmateria] = useState(''); //วัสดุ
  const [productheight, setProductheight] = useState('');
  const [productwidth, setProductwidth] = useState('');
  const [productdepth, setProductdepth] = useState('');
  const [productsize, setProductsize] = useState('');
  // เปิด Modal เพิ่มผลิตภัณฑ์
  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
    setProductbrand('');
    setProductName('');
    setProductPrice('');
    setProductfeature('');
    setdetails('');
    setProductdetproductdetailsfeature('');
    setProductdeproductdetailshowtouse('');
    setProductdetailinstructions('');
    setProductdetailPrecaution('');
    setProductmainmateria('');
    setProductheight('');
    setProductwidth('');
    setProductdepth('');
    setProductsize('');
  };

  // ปิด Modal เพิ่มผลิตภัณฑ์
  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  // เพิ่มผลิตภัณฑ์
  const addProduct = () => {
    const newProduct = {
      id: uuid4(),
      name: productName,
      price: productPrice,
      brand: productbrand,
      feature: productfeature,
      details: productdetails,
      detailsfeature: productdetailsfeature,
      detailshowtouse: productdetailshowtouse,
      detailinstructions: productdetailinstructions,
      detailPrecaution: productdetailPrecaution,
      mainmaterial: productmainmaterial,
      height: productheight,
      width: productwidth,
      depth: productdepth,
      size: productsize,
    };
    console.log('newProduct', newProduct);

    // เคลียร์ค่าที่ป้อนใน Input
    setIsAddProductModalOpen(true);
    setProductbrand('');
    setProductName('');
    setProductPrice('');
    setProductfeature('');
    setdetails('');
    setProductdetproductdetailsfeature('');
    setProductdeproductdetailshowtouse('');
    setProductdetailinstructions('');
    setProductdetailPrecaution('');
    setProductmainmateria('');
    setProductheight('');
    setProductwidth('');
    setProductdepth('');
    setProductsize('');

    setProducts([...products, newProduct]);
    closeAddProductModal();
  };

  // เปิด Modal แก้ไขผลิตภัณฑ์
  const openEditProductModal = (product) => {
    setEditProduct(product);
    // ตั้งค่าค่าเริ่มต้นของ productName และ productPrice เพื่อแสดงค่าเดิม
    setProductName(product.name);
    setProductPrice(product.price);
    setProductbrand(product.brand);
    setProductfeature(product.feature);
    setdetails(product.details);
    setProductdetproductdetailsfeature(product.detailsfeature);
    setProductdeproductdetailshowtouse(product.detailshowtouse);
    setProductdetailinstructions(product.detailinstructions);
    setProductdetailPrecaution(product.detailPrecaution);
    setProductmainmateria(product.mainmaterial);
    setProductheight(product.height);
    setProductwidth(product.width);
    setProductdepth(product.depth);
    setProductsize(product.size);
  };

  // ปิด Modal แก้ไขผลิตภัณฑ์
  const closeEditProductModal = () => {
    setEditProduct(null);
  };

  // บันทึกการแก้ไขผลิตภัณฑ์
  const saveEditedProduct = () => {
    const editedProduct = {
      ...editProduct,
      name: productName,
      price: productPrice,
      brand: productbrand,
      feature: productfeature,
      details: productdetails,
      detailsFeature: productdetailsfeature,
      detailShowtouse: productdetailshowtouse,
      detailinstructions: productdetailinstructions,
      detailPrecaution: productdetailPrecaution,
      mainmaterial: productmainmaterial,
      height: productheight,
      width: productwidth,
      depth: productdepth,
      size: productsize,
    };
    setProducts(
      products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
    closeEditProductModal();

    // เคลียร์ค่าที่ป้อนใน Input
    setProductbrand('');
    setProductName('');
    setProductPrice('');
    setProductfeature('');
    setdetails('');
    setProductdetproductdetailsfeature('');
    setProductdeproductdetailshowtouse('');
    setProductdetailinstructions('');
    setProductdetailPrecaution('');
    setProductmainmateria('');
    setProductheight('');
    setProductwidth('');
    setProductdepth('');
    setProductsize('');
  };

  // เปิด Modal ลบผลิตภัณฑ์
  const openDeleteProductModal = (product) => {
    setEditProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  // ปิด Modal ลบผลิตภัณฑ์
  const closeDeleteProductModal = () => {
    setEditProduct(null);
    setIsDeleteProductModalOpen(false);
  };

  // ลบผลิตภัณฑ์
  const deleteProduct = (productToDelete) => {
    setProducts(
      products.filter((product) => product.id !== productToDelete.id)
    );
    closeDeleteProductModal();
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
                <Text position="relative" right="-10px" fontWeight="bold">
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
              bottom="-30px"
            >
              Product Management
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
              w="115px"
              h="100px"
              position="relative"
              right="-20px"
              bottom="-10px"
            >
              <Flex>
                {/* <AddProduct/> */}
                {/* <Box>
                  <Button
                    onClick={openAddProductModal}
                    w="113px"
                    h="40px"
                    right="-12px"
                    position="relative"
                    bottom="-10px"
                    borderRadius="50px"
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
                  <Modal
                    isOpen={isAddProductModalOpen}
                    onClose={closeAddProductModal}
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
                      <ModalHeader></ModalHeader>
                      <ModalBody fontFamily={'Kanit, sans-serif'}>
                        <Flex>
                          <Box>
                            <Box
                              w="700px"
                              h="45px"
                              position="relative"
                              top="-10px"
                            >
                              <Box
                                fontWeight="bold"
                                fontSize="18"
                                position="relative"
                                right="-10px"
                                top="-8px"
                              >
                                เพิ่มสินค้า
                              </Box>
                              <Box
                                fontSize="14"
                                position="relative"
                                right="-40px"
                                top="-10px"
                              >
                                เพิ่มสินค้าลงคลัง
                              </Box>
                            </Box>
                            <Box w="700px" h="500px" position="relative">
                              <Box>
                                <Flex h="100%">
                                  <Box>
                                    <InputGroup
                                      position="relative"
                                      right="-30px"
                                    >
                                      <Input
                                        htmlSize={32}
                                        width="200px"
                                        placeholder="ยี่ห้อ"
                                        focusBorderColor="#0F63E9"
                                        _hover={{ borderColor: '#0F63E9' }}
                                        onChange={(e) =>
                                          setProductbrand(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                    <InputGroup
                                      position="relative"
                                      bottom="-10px"
                                      right="-30px"
                                    >
                                      <Input
                                        htmlSize={32}
                                        width="200px"
                                        placeholder="ชื่อสินค้า"
                                        focusBorderColor="#0F63E9"
                                        _hover={{ borderColor: '#0F63E9' }}
                                        onChange={(e) =>
                                          setProductName(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                    <InputGroup
                                      position="relative"
                                      bottom="-20px"
                                      right="-30px"
                                    >
                                      <Input
                                        htmlSize={32}
                                        width="200px"
                                        placeholder="ราคา"
                                        focusBorderColor="#0F63E9"
                                        _hover={{ borderColor: '#0F63E9' }}
                                        onChange={(e) =>
                                          setProductPrice(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </Box>
                                  <Textarea
                                    placeholder="คุณสมบัติโดยรวม"
                                    w="420px"
                                    h="140px"
                                    resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                    rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                    position="relative"
                                    right="-50px"
                                    onChange={(e) =>
                                      setProductfeature(e.target.value)
                                    }
                                  />
                                </Flex>
                                <Box
                                  position="relative"
                                  bottom="-15px"
                                  right="-10px"
                                >
                                  <Text>รายละเอียดสินค้า</Text>
                                </Box>

                                <Flex position="relative" right="-30px">
                                  <Box position="relative" bottom="-20px">
                                    <Textarea
                                      placeholder="รายละเอียดสินค้า"
                                      w="200px"
                                      h="140px"
                                      resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                      rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                      position="relative"
                                      bottom="-10px"
                                      onChange={(e) =>
                                        setdetails(e.target.value)
                                      }
                                    />
                                  </Box>

                                  <Box
                                    position="relative"
                                    bottom="-20px"
                                    right="-20px"
                                  >
                                    <Textarea
                                      placeholder="รายละเอียดคุณสมบัติ"
                                      w="200px"
                                      h="140px"
                                      resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                      rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                      position="relative"
                                      bottom="-10px"
                                      onChange={(e) =>
                                        setProductdetproductdetailsfeature(
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Box>

                                  <Box
                                    position="relative"
                                    bottom="-20px"
                                    right="-40px"
                                  >
                                    <Textarea
                                      placeholder="รายละเอียดวิธีใช้งาน"
                                      w="200px"
                                      h="140px"
                                      resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                      rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                      position="relative"
                                      bottom="-10px"
                                      onChange={(e) =>
                                        setProductdeproductdetailshowtouse(
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Box>
                                </Flex>
                                <Flex
                                  position="relative"
                                  right="-30px"
                                  bottom="-20px"
                                >
                                  <Box position="relative" bottom="-20px">
                                    <Textarea
                                      placeholder="รายละเอียดคำแนะนำ"
                                      w="200px"
                                      h="140px"
                                      resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                      rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                      position="relative"
                                      bottom="-10px"
                                      onChange={(e) => {
                                        setProductdetailinstructions(
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </Box>

                                  <Box
                                    position="relative"
                                    bottom="-20px"
                                    right="-20px"
                                  >
                                    <Textarea
                                      placeholder="รายละเอียดข้อควรระวัง"
                                      w="200px"
                                      h="140px"
                                      resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                      rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                      position="relative"
                                      bottom="-10px"
                                      onChange={(e) =>
                                        setProductdetailPrecaution(
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Box>
                                </Flex>
                              </Box>
                            </Box>
                          </Box>

                          <Box w="300px" h="500px">
                            <Box position="relative" bottom="-10px">
                              <Text>ข้อมูลจำเพาะ</Text>
                            </Box>
                            <Box position="relative" bottom="-20px">
                              <Input
                                htmlSize={32}
                                position="relative"
                                right="-20px"
                                width="200px"
                                placeholder="แบรนด์"
                                focusBorderColor="#0F63E9"
                                _hover={{ borderColor: '#0F63E9' }}
                                onChange={(e) =>
                                  setProductbrand(e.target.value)
                                }
                              />
                              <Input
                                htmlSize={32}
                                position="relative"
                                bottom="-10px"
                                right="-20px"
                                width="200px"
                                placeholder="วัสดุหลัก"
                                focusBorderColor="#0F63E9"
                                _hover={{ borderColor: '#0F63E9' }}
                                onChange={(e) =>
                                  setProductmainmateria(e.target.value)
                                }
                              />
                              <Input
                                htmlSize={32}
                                position="relative"
                                bottom="-20px"
                                right="-20px"
                                width="200px"
                                placeholder="ความสูง (ซม.)"
                                focusBorderColor="#0F63E9"
                                _hover={{ borderColor: '#0F63E9' }}
                                onChange={(e) => {
                                  setProductheight(e.target.value);
                                }}
                              />
                              <Input
                                htmlSize={32}
                                position="relative"
                                bottom="-30px"
                                right="-20px"
                                width="200px"
                                placeholder="ความกว้าง (ซม.)"
                                focusBorderColor="#0F63E9"
                                _hover={{ borderColor: '#0F63E9' }}
                                onChange={(e) => {
                                  setProductwidth(e.target.value);
                                }}
                              />
                              <Input
                                htmlSize={32}
                                position="relative"
                                bottom="-40px"
                                right="-20px"
                                width="200px"
                                placeholder="ความลึก (ซม.)"
                                focusBorderColor="#0F63E9"
                                _hover={{ borderColor: '#0F63E9' }}
                                onChange={(e) => {
                                  setProductdepth(e.target.value);
                                }}
                              />
                              <Input
                                htmlSize={32}
                                position="relative"
                                bottom="-50px"
                                right="-20px"
                                width="200px"
                                placeholder="ขนาดสินค้า (นิ้ว)"
                                focusBorderColor="#0F63E9"
                                _hover={{ borderColor: '#0F63E9' }}
                                onChange={(e) => {
                                  setProductsize(e.target.value);
                                }}
                              />
                            </Box>
                          </Box>
                        </Flex>
                      </ModalBody>
                      <ModalFooter fontFamily={'Kanit, sans-serif'}>
                        <Box w="10px" h="10px" />
                        <Button
                          onClick={addProduct}
                          w="184px"
                          h="40px"
                          borderRadius="8px"
                          bg="#564DE6"
                          border="none"
                          p={0}
                          _hover={{
                            bg: '#2C23BF',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, .2)',
                          }}
                          position="relative"
                          top="-70px"
                        >
                          <Text color="white" fontSize="14">
                            บันทึก
                          </Text>
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box> */}
                <AddProduct
                  key={1}
                  updateProductInStore={updateProductInStore}
                />
                <ExcelFileUploader />
              </Flex>
            </Box>

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
                <Text position="relative" right="-135px" bottom="-5px">
                  ยี่ห้อ
                </Text>
                <Text position="relative" right="-500px" bottom="-5px">
                  ชื่อสินค้า
                </Text>
                <Text position="relative" right="-923px" bottom="-5px">
                  ราคา
                </Text>
                <Text position="relative" right="-995px" bottom="-5px">
                  จำนวนสินค้าในคลัง
                </Text>
                <Text position="relative" right="-1100px" bottom="-5px">
                  ดูข้อมูล
                </Text>
              </Flex>
            </Box>

            <Box
              w="1500px"
              h="615px"
              bg="white"
              overflow="scroll"
              position="relative"
              right="-32px"
              bottom="-20px"
            >
              {productInStore.map((product, index) => (
                <Box h="40px" borderBottom="2px solid #E7EEF3">
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
                    <Box h="40px" w="220px">
                      <Text position="relative" right="-15px" bottom="-8px">
                        {product.brandName}
                      </Text>
                    </Box>
                    <Box h="40px" w="710px">
                      <Text position="relative" right="-15px" bottom="-8px">
                        {product.productName}
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="100px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text position="relative" bottom="-8px">
                        {product.price}
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="200px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text position="relative" bottom="-8px">
                        {product.quantity}
                      </Text>
                    </Box>
                    <Box
                      h="40px"
                      w="100px"
                      display="flex"
                      justifyContent="center"
                      position="relative"
                      right="-40px"
                    >
                      <Box>
                        <Button
                          onClick={() => openEditProductModal(product)}
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
                          isOpen={!!editProduct}
                          onClose={closeEditProductModal}
                          onOverlayClick={handleOverlayClick}
                          closeOnEsc={false}
                        >
                          <ModalOverlay />
                          <ModalContent
                            maxW="980px"
                            w="100%"
                            maxH="620px"
                            h="100%"
                          >
                            <ModalHeader></ModalHeader>
                            <ModalBody fontFamily={'Kanit, sans-serif'}>
                              <Flex>
                                <Box>
                                  <Box
                                    w="700px"
                                    h="45px"
                                    position="relative"
                                    top="-10px"
                                  >
                                    <Box
                                      fontWeight="bold"
                                      fontSize="18"
                                      position="relative"
                                      right="-10px"
                                      top="-8px"
                                    >
                                      แก้ไขสินค้า
                                    </Box>
                                    <Box
                                      fontSize="14"
                                      position="relative"
                                      right="-40px"
                                      top="-10px"
                                    >
                                      แก้ไขสินค้าในคลัง
                                    </Box>
                                  </Box>
                                  <Box w="700px" h="500px" position="relative">
                                    <Box>
                                      <Flex h="100%">
                                        <Box>
                                          <InputGroup
                                            position="relative"
                                            right="-30px"
                                          >
                                            <Input
                                              readOnly
                                              htmlSize={32}
                                              value={productbrand}
                                              width="200px"
                                              placeholder="ยี่ห้อ"
                                              focusBorderColor="#0F63E9"
                                              _hover={{
                                                borderColor: '#0F63E9',
                                              }}
                                              onChange={(e) =>
                                                setProductbrand(e.target.value)
                                              }
                                            />
                                          </InputGroup>
                                          <InputGroup
                                            position="relative"
                                            bottom="-10px"
                                            right="-30px"
                                          >
                                            <Input
                                              readOnly
                                              htmlSize={32}
                                              value={productName}
                                              width="200px"
                                              placeholder="ชื่อสินค้า"
                                              focusBorderColor="#0F63E9"
                                              _hover={{
                                                borderColor: '#0F63E9',
                                              }}
                                              onChange={(e) =>
                                                setProductName(e.target.value)
                                              }
                                            />
                                          </InputGroup>
                                          <InputGroup
                                            position="relative"
                                            bottom="-20px"
                                            right="-30px"
                                          >
                                            <Input
                                              htmlSize={32}
                                              value={productPrice}
                                              width="200px"
                                              placeholder="ราคา"
                                              focusBorderColor="#0F63E9"
                                              _hover={{
                                                borderColor: '#0F63E9',
                                              }}
                                              onChange={(e) =>
                                                setProductPrice(e.target.value)
                                              }
                                            />
                                          </InputGroup>
                                        </Box>
                                        <Textarea
                                          readOnly
                                          placeholder="คุณสมบัติโดยรวม"
                                          value={productfeature}
                                          w="420px"
                                          h="140px"
                                          resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                          rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                          position="relative"
                                          right="-50px"
                                          onChange={(e) =>
                                            setProductfeature(e.target.value)
                                          }
                                        />
                                      </Flex>
                                      <Box
                                        position="relative"
                                        bottom="-15px"
                                        right="-10px"
                                      >
                                        <Text>รายละเอียดสินค้า</Text>
                                      </Box>

                                      <Flex position="relative" right="-30px">
                                        <Box position="relative" bottom="-20px">
                                          <Textarea
                                            readOnly
                                            placeholder="รายละเอียดสินค้า"
                                            value={productdetails}
                                            w="200px"
                                            h="140px"
                                            resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                            rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                            position="relative"
                                            bottom="-10px"
                                            onChange={(e) => {
                                              setdetails(e.target.value);
                                            }}
                                          />
                                        </Box>

                                        <Box
                                          position="relative"
                                          bottom="-20px"
                                          right="-20px"
                                        >
                                          <Textarea
                                            readOnly
                                            placeholder="รายละเอียดคุณสมบัติ"
                                            value={productdetailsfeature}
                                            w="200px"
                                            h="140px"
                                            resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                            rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                            position="relative"
                                            bottom="-10px"
                                            onChange={(e) => {
                                              setProductdetproductdetailsfeature(
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </Box>

                                        <Box
                                          position="relative"
                                          bottom="-20px"
                                          right="-40px"
                                        >
                                          <Textarea
                                            readOnly
                                            placeholder="รายละเอียดวิธีใช้งาน"
                                            value={productdetailshowtouse}
                                            w="200px"
                                            h="140px"
                                            resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                            rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                            position="relative"
                                            bottom="-10px"
                                            onChange={(e) => {
                                              setProductdeproductdetailshowtouse(
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </Box>
                                      </Flex>
                                      <Flex
                                        position="relative"
                                        right="-30px"
                                        bottom="-20px"
                                      >
                                        <Box position="relative" bottom="-20px">
                                          <Textarea
                                            readOnly
                                            placeholder="รายละเอียดคำแนะนำ"
                                            value={productdetailinstructions}
                                            w="200px"
                                            h="140px"
                                            resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                            rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                            position="relative"
                                            bottom="-10px"
                                            onChange={(e) => {
                                              setProductdetailinstructions(
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </Box>

                                        <Box
                                          position="relative"
                                          bottom="-20px"
                                          right="-20px"
                                        >
                                          <Textarea
                                            readOnly
                                            placeholder="รายละเอียดข้อควรระวัง"
                                            value={productdetailPrecaution}
                                            w="200px"
                                            h="140px"
                                            resize="vertical" // ช่วยให้ Textarea สามารถปรับขนาดตามเนื้อหา
                                            rows={4} // จำนวนบรรทัดเริ่มต้น (ปรับตามความต้องการ)
                                            position="relative"
                                            bottom="-10px"
                                            onChange={(e) => {
                                              setProductdetailPrecaution(
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </Box>
                                      </Flex>
                                    </Box>
                                  </Box>
                                </Box>

                                <Box w="300px" h="500px">
                                  <Box position="relative" bottom="-10px">
                                    <Text>ข้อมูลจำเพาะ</Text>
                                  </Box>
                                  <Box position="relative" bottom="-20px">
                                    <Input
                                      readOnly
                                      htmlSize={32}
                                      value={productbrand}
                                      position="relative"
                                      right="-20px"
                                      width="200px"
                                      placeholder="แบรนด์"
                                      focusBorderColor="#0F63E9"
                                      _hover={{ borderColor: '#0F63E9' }}
                                      onChange={(e) =>
                                        setProductbrand(e.target.value)
                                      }
                                    />
                                    <Input
                                      readOnly
                                      htmlSize={32}
                                      value={productmainmaterial}
                                      position="relative"
                                      bottom="-10px"
                                      right="-20px"
                                      width="200px"
                                      placeholder="วัสดุหลัก"
                                      focusBorderColor="#0F63E9"
                                      _hover={{ borderColor: '#0F63E9' }}
                                      onChange={(e) => {
                                        setProductmainmateria(e.target.value);
                                      }}
                                    />
                                    <Input
                                      readOnly
                                      htmlSize={32}
                                      value={productwidth}
                                      position="relative"
                                      bottom="-20px"
                                      right="-20px"
                                      width="200px"
                                      placeholder="ความสูง (ซม.)"
                                      focusBorderColor="#0F63E9"
                                      _hover={{ borderColor: '#0F63E9' }}
                                      onChange={(e) => {
                                        setProductwidth(e.target.value);
                                      }}
                                    />
                                    <Input
                                      readOnly
                                      htmlSize={32}
                                      value={productheight}
                                      position="relative"
                                      bottom="-30px"
                                      right="-20px"
                                      width="200px"
                                      placeholder="ความกว้าง (ซม.)"
                                      focusBorderColor="#0F63E9"
                                      _hover={{ borderColor: '#0F63E9' }}
                                      onChange={(e) => {
                                        setProductheight(e.target.value);
                                      }}
                                    />
                                    <Input
                                      readOnly
                                      htmlSize={32}
                                      value={productdepth}
                                      position="relative"
                                      bottom="-40px"
                                      right="-20px"
                                      width="200px"
                                      placeholder="ความลึก (ซม.)"
                                      focusBorderColor="#0F63E9"
                                      _hover={{ borderColor: '#0F63E9' }}
                                      onChange={(e) => {
                                        setProductdepth(e.target.value);
                                      }}
                                    />
                                    <Input
                                      readOnly
                                      htmlSize={32}
                                      value={productsize}
                                      position="relative"
                                      bottom="-50px"
                                      right="-20px"
                                      width="200px"
                                      placeholder="ขนาดสินค้า (นิ้ว)"
                                      focusBorderColor="#0F63E9"
                                      _hover={{ borderColor: '#0F63E9' }}
                                      onChange={(e) => {
                                        setProductsize(e.target.value);
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Flex>
                            </ModalBody>
                            <ModalFooter fontFamily={'Kanit, sans-serif'}>
                              <Button
                                onClick={() => deleteProduct(editProduct)}
                                w="184px"
                                h="40px"
                                borderRadius="8px"
                                bg="#564DE6"
                                border="none"
                                p={0}
                                _hover={{
                                  bg: '#2C23BF',
                                  boxShadow: '0 5px 10px rgba(0, 0, 0, .2)',
                                }}
                                position="relative"
                                top="-70px"
                              >
                                <Text color="white" fontSize="14">
                                  ลบ
                                </Text>
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Box>

            {/* สินค้าตามลำดับ  */}
            {/* <Box w="1500px" h="615px" bg="white" overflow="scroll" position="relative" right="-32px" bottom="-20px" >
                      <Box h="40px" borderBottom="2px solid #E7EEF3">
                        <Flex display="flex" position="relative">
                          <Box h="40px" w="80px" display="flex"  justifyContent="center">
                            <Text position="relative" bottom="-8px">1</Text>
                          </Box>
                          <Box h="40px" w="220px">
                            <Text position="relative" right="-18px" bottom="-8px">GIANT KINGKONG PRO</Text>
                          </Box>
                          <Box h="40px" w="690px">
                            <Text position="relative" right="-15px" bottom="-8px">ค้อนปอนด์ด้ามไฟเบอร์ GIANT KINGKONG PRO รุ่น HA 3009 ขนาด 8 ปอนด์ สีน้ำเงิน</Text>
                          </Box>
                          <Box h="40px" w="100px" display="flex"  justifyContent="center">
                            <Text position="relative" bottom="-8px">1,080</Text>
                          </Box>
                          <Box h="40px" w="200px" display="flex"  justifyContent="center">
                            <Text position="relative" right="-25px" bottom="-8px">99</Text>
                          </Box>
                          <Box h="40px" w="100px" display="flex" justifyContent="center" position="relative" right="-60px" >
                            <ViewAndEditButton/>
                          </Box>
                        </Flex>
                      </Box>

                      <Box h="40px" borderBottom="2px solid #E7EEF3">
                        <Flex display="flex" position="relative">
                          <Box h="40px" w="80px" display="flex"  justifyContent="center">
                            <Text position="relative" bottom="-8px">2</Text>
                          </Box>
                          <Box h="40px" w="220px">
                            <Text position="relative" right="-18px" bottom="-8px">KINGKONG PRO</Text>
                          </Box>
                          <Box h="40px" w="690px">
                            <Text position="relative" right="-15px" bottom="-8px">ค้อนปอนด์ด้ามไฟเบอร์</Text>
                          </Box>
                          <Box h="40px" w="100px" display="flex"  justifyContent="center">
                            <Text position="relative" bottom="-8px">500</Text>
                          </Box>
                          <Box h="40px" w="200px" display="flex"  justifyContent="center">
                            <Text position="relative" right="-25px" bottom="-8px">99</Text>
                          </Box>
                          <Box h="40px" w="100px" display="flex" justifyContent="center" position="relative" right="-60px" >
                            <ViewAndEditButton/>
                          </Box>
                        </Flex>
                      </Box>

                      <Box h="40px" borderBottom="2px solid #E7EEF3">
                        <Flex display="flex" position="relative">
                          <Box h="40px" w="80px" display="flex"  justifyContent="center">
                            <Text position="relative" bottom="-8px">3</Text>
                          </Box>
                          <Box h="40px" w="220px">
                            <Text position="relative" right="-18px" bottom="-8px">KINGKONG</Text>
                          </Box>
                          <Box h="40px" w="690px">
                            <Text position="relative" right="-15px" bottom="-8px">ค้อนปอนด์</Text>
                          </Box>
                          <Box h="40px" w="100px" display="flex"  justifyContent="center">
                            <Text position="relative" bottom="-8px">100</Text>
                          </Box>
                          <Box h="40px" w="200px" display="flex"  justifyContent="center">
                            <Text position="relative" right="-25px" bottom="-8px">99</Text>
                          </Box>
                          <Box h="40px" w="100px" display="flex" justifyContent="center" position="relative" right="-60px" >
                            <ViewAndEditButton/>
                          </Box>
                        </Flex>
                      </Box>

                    </Box> */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default ProductManagement;
