import {
  Button,
  Modal,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { useState } from "react";

export default function ComAddProduct(props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>+ add</Button>
      <Modal show={visible} onClose={() => setVisible(!visible)}>
        <Modal.Header>
          <div className="">
            <div>{props.name}</div>
            <div className="text-[15px]">
              Rp. {props.price.toLocaleString("id-ID")}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center basis-[35%]">
            <button
              // onClick={() => dispatch(onReduceCart(value.id))}
              className="border border-black w-[30px] h-[30px] pb-1 text-white"
            >
              -
            </button>
            <span className="px-3"></span>
            <button
              // onClick={() => dispatch(onAddCart(value.id))}
              className="bg-gray-900 w-[30px] h-[30px] pb-1 text-white"
            >
              +
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
