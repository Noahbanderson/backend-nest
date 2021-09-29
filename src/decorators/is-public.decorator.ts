import { SetMetadata } from '@nestjs/common'

import { KeyRegistry } from 'config/constants'

export const IsPublic = () => SetMetadata(KeyRegistry.PUBLIC_KEY, true)
