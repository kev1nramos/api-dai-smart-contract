/**
 * Module dependencies.
 */

import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Export interface `ITransaction`.
 */

export interface ITransaction {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Export `Transaction` model.
 */

@Entity({ name: 'transaction' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;
  
  @Column({ name: 'block_hash' })
  blockHash: string;

  @Column({ name: 'block_number' })
  blockNumber: number;

  @Column({ name: 'balance_address_from' })
  balanceAddressFrom: string;

  @Index()
  @Column()
  from: string;

  @Column({ name: 'balance_address_to' })
  balanceAddressTo: string;

  @Index()
  @Column()
  to: string;

  @Column()
  value: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}