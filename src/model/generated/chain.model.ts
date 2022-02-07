import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Token} from "./_token"

@Entity_()
export class Chain {
  constructor(props?: Partial<Chain>) {
    Object.assign(this, props)
  }

  /**
   * talisman-defined id for this chain
   */
  @PrimaryColumn_()
  id!: string

  /**
   * index for sorting chains in a user-friendly way
   */
  @Column_("integer", {nullable: true})
  sortIndex!: number | undefined | null

  /**
   * hash of the first block on this chain
   */
  @Column_("text", {nullable: true})
  genesisHash!: string | undefined | null

  /**
   * ss58 prefix for this chain
   */
  @Column_("integer", {nullable: true})
  prefix!: number | undefined | null

  /**
   * talisman-defined name for this chain
   */
  @Column_("text", {nullable: true})
  name!: string | undefined | null

  /**
   * chain-specified name of this chain
   */
  @Column_("text", {nullable: true})
  chainName!: string | undefined | null

  /**
   * implementation name for this chain
   */
  @Column_("text", {nullable: true})
  implName!: string | undefined | null

  /**
   * specification name for this chain
   */
  @Column_("text", {nullable: true})
  specName!: string | undefined | null

  /**
   * specification version for this chain
   */
  @Column_("text", {nullable: true})
  specVersion!: string | undefined | null

  /**
   * native token symbol for this chain
   */
  @Column_("text", {nullable: true})
  token!: string | undefined | null

  /**
   * native token decimals for this chain
   */
  @Column_("integer", {nullable: true})
  decimals!: number | undefined | null

  /**
   * minimum native tokens per account for this chain
   */
  @Column_("text", {nullable: true})
  existentialDeposit!: string | undefined | null

  /**
   * orml tokens for this chain
   */
  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new Token(undefined, marshal.nonNull(val)))}, nullable: true})
  tokens!: (Token)[] | undefined | null

  /**
   * account format for this chain
   */
  @Column_("text", {nullable: true})
  account!: string | undefined | null

  /**
   * talisman-defined rpcs for this chain
   */
  @Column_("text", {array: true, nullable: false})
  rpcs!: (string)[]

  /**
   * health status of this chain
   */
  @Column_("bool", {nullable: false})
  isHealthy!: boolean

  /**
   * parathreads of this chain (if this chain is a relaychain)
   */
  @OneToMany_(() => Chain, e => e.relay)
  parathreads!: Chain[]

  /**
   * paraId of this chain (if this chain is a parachain for another chain)
   */
  @Column_("integer", {nullable: true})
  paraId!: number | undefined | null

  /**
   * relaychain of this chain (if this chain is a parachain for another chain)
   */
  @Index_()
  @ManyToOne_(() => Chain, {nullable: true})
  relay!: Chain | undefined | null
}