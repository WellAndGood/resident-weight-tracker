import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Lorem
  } from "@chakra-ui/react"


  function BasicUsage({isOpen, onOpen, onClose}) {
    
  
    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                You can scroll the content behind the modal
              </Text>
              <Lorem count={2} />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }

export default BasicUsage