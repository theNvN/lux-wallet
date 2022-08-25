import { Divider, Heading, HStack } from '@chakra-ui/react';
import { DiamondIcon } from 'components/icons';
import { BottomNavLayout } from 'components/layout';
import { EmptyProfileView, UniversalProfileAssets } from 'components/profile';
import { useWallet } from 'contexts/wallet';
import { useTranslation } from 'react-i18next';

const DigitalAssets = () => {
  const { t } = useTranslation();
  const { activeAccount } = useWallet();

  return (
    <BottomNavLayout>
      <HStack py={2} justify="center" alignItems="center">
        <DiamondIcon size={20} />
        <Heading textAlign="center" fontSize="lg">
          {t('asset:digital-assets')}
        </Heading>
      </HStack>
      <Divider />
      {activeAccount?.universalProfile ? (
        <UniversalProfileAssets w="full" py={2} />
      ) : (
        <EmptyProfileView my={4} />
      )}
    </BottomNavLayout>
  );
};

export default DigitalAssets;
