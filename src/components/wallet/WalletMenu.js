import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  VStack,
  Circle,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Identicon } from 'components/common';
import { abbreviateHex } from 'utils/web3';
import { useWallet } from 'contexts/wallet';
import { AddIcon, CogIcon, DownloadIcon, HeartIcon, LockIcon } from 'components/icons';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import { ModalView, useUI } from 'contexts/ui';

const WalletMenu = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount, accountsData, switchAccount, lockWallet } = useWallet();
  const { setModalViewAndOpen } = useUI();

  const handleAccountSelect = address => {
    switchAccount(address);
  };

  const handleCreateAccount = () => {
    setModalViewAndOpen(ModalView.CREATE_ACCOUNT);
  };

  const handleImportAccount = () => {
    setModalViewAndOpen(ModalView.IMPORT_ACCOUNT);
  };

  const handleSocialRecovery = () => {
    navigate(Path.SOCIAL_RECOVERY);
  };

  return (
    <Menu placement="bottom-end" {...props}>
      <MenuButton>
        <Circle borderWidth={2} borderColor="red.400" p={0.5}>
          <Identicon address={activeAccount?.address} size={30} />
        </Circle>
      </MenuButton>
      <MenuList>
        <MenuGroup title={t('account:accounts')} overflowY="scroll">
          {accountsData.map(account => (
            <MenuItem
              key={account.address}
              display="flex"
              alignItems="center"
              onClick={() => handleAccountSelect(account.address)}
            >
              <Identicon size={18} address={account.address} />
              <VStack ml={2} spacing={0} alignItems="flex-start">
                <Text variant="body" fontSize="xs">
                  {account.label || abbreviateHex(account.address, 6)}
                </Text>
                <Text fontSize="xs">{abbreviateHex(account.address, 12)}</Text>
              </VStack>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuGroup title={t('common:settings')}>
          <MenuItem icon={<AddIcon />} onClick={handleCreateAccount}>
            {t('account:create-account')}
          </MenuItem>
          <MenuItem icon={<DownloadIcon />} onClick={handleImportAccount}>
            {t('account:import-account')}
          </MenuItem>
          <MenuItem icon={<HeartIcon />} onClick={handleSocialRecovery}>
            {t('common:social-recovery')}
          </MenuItem>
          <MenuItem icon={<CogIcon />} onClick={() => navigate(Path.SETTINGS)}>
            {t('common:settings')}
          </MenuItem>
          <MenuItem icon={<LockIcon />} color="red.500" onClick={lockWallet}>
            {t('common:lock')}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default WalletMenu;
