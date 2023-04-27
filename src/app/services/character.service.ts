import { Injectable } from '@angular/core';
import { Character } from '../models/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public characters: Character[] = [
    {
      id: "abcd",
      name: "Tara Qim",
      avatarUrl: "https://www.gmbinder.com/images/RL0wHsa.jpg",
      proficiencyBonus: 2,
      armorClass: 14,
      maxHitPoints: 25,
      strengthScore: 12,
      dexterityScore: 16,
      constitutionScore: 12
    },
    {
      id: "zyxv",
      name: "Mardok The Cruel",
      avatarUrl: "https://cdnb.artstation.com/p/assets/images/images/053/718/019/large/matthaeus-milletti-kpeaze-orc-wearing-armor-style-of-dnd-character-concept-intrica-01bacfe9-4187-4495-bab0-a02498c30221.jpg?1663521038",
      proficiencyBonus: 2,
      armorClass: 10,
      maxHitPoints: 32,
      strengthScore: 16,
      dexterityScore: 8,
      constitutionScore: 15
    },
  ];

  constructor() { }
}
