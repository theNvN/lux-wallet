import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGetBalance } from 'api/account/getBalance';
import { useGetUniversalProfileMetadata } from 'api/profile/getUniversalProfile';
import { Card, CopyableAddress, LuksoLogo } from 'components/common/ui';
import { ArrowUpRightIcon } from 'components/icons';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';
import { FaWallet } from 'react-icons/fa';
import { currency } from 'settings/constants';

const UniversalProfile = ({ ...props }) => {
  const { t } = useTranslation();
  const { activeAccount } = useAccount();
  const { data, isLoading, isFetching, isError } = useGetUniversalProfileMetadata({
    profileAddress: activeAccount?.universalProfile,
  });
  const { data: balance } = useGetBalance({ address: activeAccount?.universalProfile });

  if (isFetching && !data) {
    return <LoadingView {...props} />;
  }

  // console.log({ activeAccount, isLoading, isFetching });
  const profile = data?.profile;

  return (
    <VStack {...props}>
      <Stack
        w="100%"
        direction="column-reverse"
        alignItems="center"
        position="relative"
        height={36}
      >
        <Card
          p={2}
          backgroundImage={`url('${profile?.backgroundImage}')`}
          position="absolute"
          height={24}
          top={0}
          right={0}
          left={0}
        >
          <Text fontSize="sm" fontWeight="bold" color="gray.400" textAlign="center">
            @{profile?.name}
          </Text>
        </Card>

        <Center position="absolute" bottom={2} right={0} left={0}>
          <CopyableAddress
            abbreviate={30}
            text={{ textAlign: 'center' }}
            address={activeAccount?.universalProfile}
          />
        </Center>
        <Avatar size="xl" src={profile?.avatar} />
      </Stack>
      <HStack justify="center">
        <LuksoLogo size={6} />
        <Text fontSize="sm" fontWeight="bold">
          {balance?.lyx} {currency}
        </Text>
      </HStack>
      <Button size="sm" leftIcon={<ArrowUpRightIcon />}>
        {t('asset:send')}
      </Button>
    </VStack>
  );
};

const LoadingView = ({ ...props }) => {
  return (
    <Stack
      w="100%"
      direction="column-reverse"
      alignItems="center"
      position="relative"
      height={36}
      {...props}
    >
      <Skeleton position="absolute" height={24} rounded="md" top={0} right={0} left={0} />
      <SkeletonCircle size={24} borderWidth={2} borderColor="white" />
    </Stack>
  );
};

export default UniversalProfile;