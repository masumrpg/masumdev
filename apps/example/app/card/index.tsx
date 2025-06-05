import ComponentDemo from '@/components/ComponentDemo';
import { Heart } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Button,
  ButtonIcon,
  ButtonText,
  useThemedStyles
} from 'rnc-theme';
import { Theme } from 'rnc-theme';

const CardComponentsExample = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <ComponentDemo />
      <Card>
        <CardHeader title="Title" subtitle="Subtitle" borderBottom />
        <CardContent>
          <Text>Content goes here</Text>
        </CardContent>
        <CardFooter justifyContent="space-between">
          <Button variant="primary" component="pressable">
            <ButtonIcon icon={<Heart />} marginRight="xs" />
            <ButtonText>Like</ButtonText>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
  },
  contentText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.text,
  },
  customTitle: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '700' as const,
    color: theme.colors.primary,
  },
  button: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});

export default CardComponentsExample;