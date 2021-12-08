import { base64, capitalize, currentTimestamp, timeLeft } from './helpers';
import { Token } from './interface';

export abstract class BaseToken {
  constructor(protected attributes: Token) {}

  get access_token(): string {
    return this.attributes.access_token;
  }

  get refresh_token(): string | undefined {
    return this.attributes.refresh_token;
  }

  get token_type(): string {
    return this.attributes.token_type;
  }

  get exp(): number | undefined {
    return this.attributes.exp;
  }

  valid(): boolean {
    return this.hasAccessToken() && !this.isExpired();
  }

  getBearerToken(): string {
    return this.access_token
      ? [capitalize(this.token_type), this.access_token].join(' ').trim()
      : '';
  }

  needRefresh(): boolean {
    return this.exp !== undefined && this.exp >= 0;
  }

  getRefreshTime(): number {
    return timeLeft((this.exp ?? 0) - 5);
  }

  private hasAccessToken(): boolean {
    console.log("value",!!this.access_token)
    return !!this.access_token;
  }

  private isExpired(): boolean {
    return this.exp !== undefined && this.exp - currentTimestamp() <= 0;
  }
}

export class GuestToken extends BaseToken {
  constructor() {
    super({ access_token: '', token_type: '' });
  }
}

export class SimpleToken extends BaseToken {}

export class JwtToken extends SimpleToken {
  private _payload?: { exp: number | undefined };

  static is(accessToken: string): boolean {
    try {
      const [_header] = accessToken.split('.');
      const header = JSON.parse(base64.decode(_header));

      return header.typ.toUpperCase().includes('JWT');
    } catch (e) {
      return false;
    }
  }

  get exp(): number | undefined {
    return this.payload!.exp;
  }

  private get payload(): any {
    if (!this.access_token) {
      return { exp: undefined };
    }

    if (!this._payload) {
      const [, payload] = this.access_token.split('.');
      const data = JSON.parse(base64.decode(payload));
      if (!data.exp) {
        data.exp = this.attributes.exp;
      }
      this._payload = data;
    }

    return this._payload;
  }
}
