import CustomNode from "./CustomNode";
const CustomNodeWrapper = ({ nodeList, ...otherProps }) => {
    return <CustomNode {...otherProps} nodeList={nodeList} />;
  };
export default CustomNodeWrapper 