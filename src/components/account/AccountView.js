import { Box, Button, VStack } from '@chakra-ui/react';
import { LuksoLogo } from 'components/common/ui';
import { ArrowUpRightIcon } from 'components/icons';
import { EmptyProfileView, UniversalProfile } from 'components/profile';
import { useWallet } from 'contexts/wallet';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import AccountHeader from './AccountHeader';

const AccountView = ({ ...props }) => {
  const { t } = useTranslation();
  const { activeAccount } = useWallet();
  const navigate = useNavigate();

  const handleSend = () => {
    navigate(Path.TX_SEND_LYX);
  };

  return (
    <Box {...props}>
      <AccountHeader borderBottomWidth="1px" borderBottomColor="whiteAlpha.200" />
      {activeAccount?.universalProfile ? (
        <UniversalProfile my={4} />
      ) : (
        <>
          <VStack my={4}>
            <LuksoLogo size={12} />
            <Button size="sm" leftIcon={<ArrowUpRightIcon />} onClick={handleSend}>
              {t('asset:send')}
            </Button>
          </VStack>
          <EmptyProfileView py={2} />
        </>
      )}
    </Box>
  );
};

export default AccountView;
