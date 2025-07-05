# PowerShell script to fix all effect components
# Fixes: instant hide (0.1 -> 0), remove rounded-4xl, expand coverage

$effects = @(
    "ElectricEffect.tsx",
    "GrassEffect.tsx", 
    "IceEffect.tsx",
    "PsychicEffect.tsx",
    "RockEffect.tsx",
    "GroundEffect.tsx",
    "GhostEffect.tsx",
    "PoisonEffect.tsx",
    "SteelEffect.tsx",
    "FairyEffect.tsx",
    "DragonEffect.tsx",
    "DarkEffect.tsx",
    "FlyingEffect.tsx",
    "FightingEffect.tsx",
    "NormalEffect.tsx"
)

foreach ($effect in $effects) {
    $filePath = "components/$effect"
    Write-Host "Fixing $effect..."
    
    # Read file content
    $content = Get-Content $filePath -Raw
    
    # Replace 0.1 with 0 for instant hide
    $content = $content -replace ': 0\.1,', ': 0,'
    
    # Remove rounded-4xl constraint
    $content = $content -replace 'rounded-4xl ', ''
    
    # Write back to file
    $content | Set-Content $filePath -NoNewline
    
    Write-Host "Fixed $effect"
}

Write-Host "All effects fixed!" 