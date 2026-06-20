import { Textarea, Button, Select } from "@chakra-ui/react";
import React,{ useState } from "react";

export const TodoAdd = ({ 
    placeholder,
    leftIcon,
    buttonText,
    inputEl,
    dateInputEl,
    categoryInputEl,
    handleAddTodoListItem
}) => {
  
  const [ category, setCategory ] = useState("仕事");
  const [ status, setStatus] = useState("未着手");
    
  return (
    <>
    <Textarea 
      placeholder={placeholder}
      bgColor="white"
      mt="8"
      borderColor="gray.400"
      ref={ inputEl }
      />
      <input 
       type="date"
       bgColor="white"
       borderColor="gray.400"
       ref={ dateInputEl}
      />

      <Select 
        ref={categoryInputEl}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        mb="3">
         <option value="仕事">仕事</option>
         <option value="プライベート">プライベート</option>     
      </Select>
      {category === "仕事" && (
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="未着手">未着手</option>
          <option value="作業中">作業中</option>
          <option value="確認中">確認中</option>
        </Select>
        <Box mt="3">
        <Text mb="1">コメント</Text>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力"
          bgColor="white"
          borderColor="gray.400"
          />
         </Box>

      )}
    <Button 
      onClick={() => handleAddTodoListItem(status)}
      colorScheme="blue"
      leftIcon={leftIcon}
      mt="8"
      >
        {buttonText}
      </Button>
    </>
  );
};
