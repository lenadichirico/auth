import React from "react";
import styled from "@emotion/styled";

const Input = ({ type, name, label, value, onChange, error, focus }) => {
  return (
    <Group>
      <Label htmlFor={name} className={focus}>
        <span>{label}</span>
        <InputArea
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          autoCapitalize="off"
          autoCorrect="off"
          pattern={".*\\S.*"}
        />
      </Label>
      {error && (
        <Error>
          <span />
        </Error>
      )}
    </Group>
  );
};

const Group = styled.div`
  align-items: center;
  background: #fafafa;
  border: 1px solid #efefef;
  border-radius: 3px;
  box-sizing: border-box;
  color: #262626;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: relative;
  -webkit-appearance: none;
  width: 100%;
  margin: 7px auto;
`;

const Label = styled.label`
  display: flex;
  height: 36px;
  flex: 1 0 0;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;

  & > span {
    color: #999;
    font-size: 12px;
    height: 36px;
    left: 8px;
    line-height: 36px;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
    text-overflow: ellipsis;
    transform-origin: left;
    transition: transform ease-out 0.5s;
    user-select: none;
    white-space: nowrap;
  }
  &.focused > span {
    transform: scale(0.83333) translateY(-10px);
  }
  &.focused input {
    font-size: 12px;
    padding: 14px 0 2px 8px !important;
  }
`;

const InputArea = styled.input`
  appearance: none;
  background: #fafafa;
  border: 0;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
  font-size: 16px;

  &:focus {
    border: 1px solid #333;
    outline: none;
  }
`;

const Error = styled.div`
  position: absolute;
  top: 7px;
  right: 10px;
  z-index: 10;
  & > span {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    background-position: -250px -146px;
    background-image: url(https://www.instagram.com/static/bundles/es6/sprite_core_b20f2a3cd7e4.png/b20f2a3cd7e4.png);
  }
`;

export default Input;
