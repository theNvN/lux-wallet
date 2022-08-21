import { Text, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { CopyableAddress } from 'components/common/ui';

const VaultItem = ({ data, onClick, ...props }) => {
  return (
    <VStack
      boxSize={20}
      {...props}
      shadow="md"
      bgColor="white"
      rounded="md"
      cursor="pointer"
      onClick={onClick}
    >
      <Identicon address={data.address} size={32} variant="square" />
      <Text fontSize="xs" fontWeight="semibold" noOfLines={1}>
        {data.label}
      </Text>
      {/* <CopyableAddress
        address={data.address}
        abbreviate={6}
        text={{ fontSize: 'xs', color: 'gray.400' }}
      /> */}
    </VStack>
  );
};

export default VaultItem;