import { RefObject } from 'react';
import type {
  MultiStoryRef,
  UserProps,
  CallbackProps,
  StoryType
} from '../../../src';

export interface HeaderProps extends Partial<CallbackProps>, UserProps {
  multiStoryRef?: RefObject<MultiStoryRef> | null;
}

export interface FooterProps extends Partial<CallbackProps> { }

export interface GradientProps extends Partial<CallbackProps> { }

export interface OverlayType {
  item: StoryType;
}