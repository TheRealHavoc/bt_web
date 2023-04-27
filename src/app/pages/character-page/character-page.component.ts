import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { AbilityModifier } from 'src/app/utils/ability-modifier';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent {
  public getAbilityModifier = AbilityModifier.calculate;

  public character: Character | undefined;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    avatarUrl: new FormControl('', Validators.required),
    strScore: new FormControl('', Validators.required),
    dexScore: new FormControl('', Validators.required),
    conScore: new FormControl('', Validators.required)
  });

  constructor(
    public characterService: CharacterService,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.character = this.characterService.characters.find(item => item.id == id);

    this.form.get('name')?.setValue(this.character?.name);
    this.form.get('avatarUrl')?.setValue(this.character?.avatarUrl);
    this.form.get('strScore')?.setValue(this.character?.strengthScore);
    this.form.get('dexScore')?.setValue(this.character?.dexterityScore);
    this.form.get('conScore')?.setValue(this.character?.constitutionScore);
  }

  public calculateAbilityModifier(score: number): string {
    let modifier = AbilityModifier.calculate(score);

    if (modifier < 0)
      return `${modifier}`;

    return `+${modifier}`;
  }

  public onSubmit() {
    if (this.form.invalid) return;
  }
}
