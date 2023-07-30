import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClickIndex, style }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => onClickIndex(index)} style={style}>
          {rating > index ? (
            <AiFillStar size={15} />
          ) : (
            <AiOutlineStar size={15} />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
