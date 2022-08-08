import React from 'react';
import {TextInput, Button, KeyboardTypeOptions, Keyboard} from 'react-native';
import {ThemeContext} from '../../App';

interface InputType {
  value: string | undefined;
  setText: (text: string) => void;
  placeHolder: string;
}
interface Props extends InputType {
  pressed: () => void;
  type?: KeyboardTypeOptions;
  extraInput?: InputType | undefined;
}

interface ShowProps {
  children: React.ReactNode;
  showValue: boolean;
}
export function ShowComponent({children, showValue}: ShowProps) {
  if (showValue) return <>{children}</>;
  return <></>;
}

function Input(props: Props) {
  const styles = React.useContext(ThemeContext);
  const disabled = props.extraInput
    ? !props.extraInput?.value || !props.value
    : props.value === '';
  return (
    <>
      <TextInput
        keyboardType={props.type}
        style={[
          {
            width: 'auto',
            minWidth: '60%',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          },
          styles.mar,
          styles.p2,
        ]}
        placeholder={props.placeHolder}
        value={props.value}
        onChangeText={props.setText}
      />
      <ShowComponent showValue={!!props.extraInput}>
        <TextInput
          style={[
            {
              width: 'auto',
              minWidth: '60%',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            },
            styles.mar,
            styles.p2,
          ]}
          keyboardType="number-pad"
          placeholder={props.extraInput?.placeHolder}
          value={props.extraInput?.value}
          onChangeText={props.extraInput?.setText}
        />
      </ShowComponent>
      <Button
        title="Get Info"
        onPress={e => {
          props.pressed();
          Keyboard.dismiss();
        }}
        disabled={disabled}
      />
    </>
  );
}

export default Input;
